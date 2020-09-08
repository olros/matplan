import { useState, useEffect } from 'react';
import { auth } from '../firebase';

export const useAuth = () => {
  const [state, setState] = useState<firebase.User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(!auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setState(user);
      } else {
        auth.signInAnonymously().catch((error) => {
          console.log(error.code, error.message);
        });
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return [state, isLoading];
};

export default useAuth;
