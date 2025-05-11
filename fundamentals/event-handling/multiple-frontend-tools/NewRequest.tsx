import React from 'react';
import React16 from 'react16';
import ReactDOM16 from 'react-dom16';
import { createRoot } from 'react-dom/client';

// React 16 component
const NewRequestContent = () => {
  return React16.createElement(
    'div',
    { 
      className: 'leave-row', 
      style: { border: '2px solid #222', borderRadius: 16, padding: 18, fontSize: 22 },
      onClick: () => alert('Submitting Leave Request'),
    },
    'New Request: squad paws, React 16'
  );
};

// React 18 component
// const NewRequestContent = () => (
//   <div 
//     className="leave-row" style={{ border: '2px solid #222', borderRadius: 16, padding: 18, fontSize: 22 }}
//     onClick={() => alert('Submitting Leave Request')}
//   >
//     New Request: squad paws, React 16
//   </div>
// );

const NewRequest = () => {
  React.useEffect(() => {
    const container = document.getElementById('new-request');
    if (container) {
      // const root = createRoot(container);
      // root.render(<NewRequestContent />);
      // return () => root.unmount();
      ReactDOM16.render(React16.createElement(NewRequestContent), container);
    }
    return () => {
      if (container) {
        ReactDOM16.unmountComponentAtNode(container);
      }
    };
  }, []);

  return <div id="new-request"></div>;
};

export default NewRequest;
