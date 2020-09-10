import { useState, useEffect } from 'react';
import { fbAuth } from '../firebase';

export const useAuth = () => {
  const [user, setUser] = useState<firebase.User | null>(fbAuth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = fbAuth.onAuthStateChanged((newUser: firebase.User | null) => {
      newUser ? setUser(newUser) : fbAuth.signInAnonymously();
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return [user, isLoading] as const;
};
