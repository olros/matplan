import { useState, useEffect } from 'react';
import { auth } from '../firebase';

export const useAuth = () => {
  const [state, setState] = useState(auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(!auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        setState(user);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return [state, isLoading];
};

export default useAuth;
