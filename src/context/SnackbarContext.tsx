// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useContext, useCallback, useMemo, createContext, ReactNode } from 'react';
import Snackbar from '../components/layout/Snackbar';

type ContextProps = {
  showSnackbar: (title: string, options?: Record<string, unknown>) => void;
};

const SnackbarContext = createContext<ContextProps | undefined>(undefined);

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackTitle, setSnackTitle] = useState('');
  const [snackOptions, setSnackOptions] = useState({});

  const showSnackbar = useCallback((title, options) => {
    setSnackTitle(title);
    setSnackOptions(options);
    setSnackbarOpen(true);
  }, []);

  const value = useMemo(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar close={() => setSnackbarOpen(false)} open={snackbarOpen} options={snackOptions} title={snackTitle} />
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export default useSnackbar;
export { SnackbarProvider, useSnackbar };
