import React from 'react';
import RenderList from './RenderList';
import NewRequest from './NewRequest';

const LeaveRequest = () => (
  <div 
    className="leave-request" style={{ border: '2px solid #222', borderRadius: 20, padding: 24, margin: '16px 0 0 0', width: '100%' }}
    onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.stopPropagation(); alert('Prevent redirect to Profile Detail page') }}
  >
    <div style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 24 }}>Leave Request</div>
    <RenderList />
    <NewRequest />
  </div>
);

export default LeaveRequest;
