import React from 'react';
import LeaveRequest from './LeaveRequest';

const ProfileCard = () => (
  <div 
    className="profile-card" style={{ border: '2px solid #222', borderRadius: 20, padding: 32, margin: 0, flex: 1, minWidth: 0 }}
    onClick={() => alert('Redirect to Profile Detail page')}
  >
    <div style={{ fontWeight: 'bold', fontSize: 28, marginBottom: 16 }}>Profile Card: squad c, React 18</div>
    <div style={{ fontSize: 22, marginBottom: 32 }}>Bio: I'm a frontend ...</div>
    <LeaveRequest />
  </div>
);

export default ProfileCard; 