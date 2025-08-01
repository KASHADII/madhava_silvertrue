import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="mb-6">
                <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-light text-black mb-2">Something went wrong</h2>
                <p className="text-gray-600 font-light mb-6">
                  We encountered an unexpected error. Please try refreshing the page.
                </p>
              </div>
              
              <div className="space-y-4">
                <Button 
                  onClick={this.handleRetry}
                  className="bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={() => window.location.reload()}
                  className="border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  Refresh Page
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 