import { useState, useEffect } from 'react';
import { fbAuth } from '../firebase';

export const useAuth = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [state, setState] = useState<firebase.User>(fbAuth.currentUser!);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = fbAuth.onAuthStateChanged((user) => {
      if (user) {
        setState(user);
        console.log(user.uid);
      } else {
        fbAuth.signInAnonymously();
        console.log('Sign in anonymous');
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return [state, isLoading] as const;
};
