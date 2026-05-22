import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-5 text-center">
          <h1 className="text-red-500 text-2xl font-bold">
            Something went wrong
          </h1>

          <p className="text-gray-500 mt-2">
            Please refresh the page
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;