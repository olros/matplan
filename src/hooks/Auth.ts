import { useState, useEffect } from 'react';
import { fbAuth } from '../firebase';

export const useAuth = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [user, setUser] = useState<firebase.User>(fbAuth.currentUser!);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = fbAuth.onAuthStateChanged((newUser) => {
      newUser ? setUser(newUser) : fbAuth.signInAnonymously();
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return [user, isLoading] as const;
};
