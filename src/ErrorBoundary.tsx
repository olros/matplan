import { Component, ReactNode } from 'react';

export type IProps = {
  children: ReactNode;
  fallback: ReactNode;
};

class ErrorBoundary extends Component<IProps> {
  state = { hasError: false, error: null };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
