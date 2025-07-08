import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

function withMouseTracking<P extends object>(WrappedComponent: React.ComponentType<P & { mouseX: number; mouseY: number; isTracking: boolean; setIsTracking: (isTracking: boolean) => void }>) {
  return class extends Component<P, { mouseX: number; mouseY: number, isTracking: boolean }> {
    state = { 
      mouseX: 0, 
      mouseY: 0,
      isTracking: false,
    };

    setIsTracking = (isTracking: boolean) => {
      this.setState({
        isTracking,
      })
    };

    handleMouseMove = (e: MouseEvent) => {
      this.setState({
        mouseX: e.clientX,
        mouseY: e.clientY
      });
    };

    componentDidMount() {
      if (this.state.isTracking) {
        document.addEventListener('mousemove', this.handleMouseMove);
      }
    }

    componentDidUpdate(prevProps: P, prevState: { mouseX: number; mouseY: number, isTracking: boolean }) {
      if (this.state.isTracking !== prevState.isTracking) {
        document.removeEventListener('mousemove', this.handleMouseMove);
        if (this.state.isTracking) {
          document.addEventListener('mousemove', this.handleMouseMove);
        }
      }
    }

    componentWillUnmount() {
      document.removeEventListener('mousemove', this.handleMouseMove);
    }

    render() {
      return (
        <WrappedComponent 
          {...this.props} 
          mouseX={this.state.mouseX} 
          mouseY={this.state.mouseY} 
          isTracking={this.state.isTracking}
          setIsTracking={this.setIsTracking} 
        />
      );
    }
  };
}

class DashboardClass extends Component<{ mouseX: number; mouseY: number; isTracking: boolean; setIsTracking: (isTracking: boolean) => void }> {
  render() {
    const { mouseX, mouseY, isTracking, setIsTracking } = this.props;
    return (
      <div>
        <p>Mouse position: ({mouseX}, {mouseY})</p>
        <button onClick={() => setIsTracking(!isTracking)}>{isTracking ? 'Stop tracking me, please' : 'Start tracking'}</button>
      </div>
    );
  }
}

const EnhancedDashboard = withMouseTracking(DashboardClass);

const root = document.getElementById('root');
if (root) {
  window['REACT_ROOT'] = ReactDOM.createRoot(root)
  window['REACT_ROOT'].render(<EnhancedDashboard />);
}
