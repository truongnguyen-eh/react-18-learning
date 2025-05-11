import React from 'react';
import Sidebar from './Sidebar';
import ProfileCard from './ProfileCard';

const responsiveStyle = `
.hr-app-container, .profile-card, .leave-request {
  box-sizing: border-box;
  max-width: 100%;
}
.hr-app-container {
  overflow-x: hidden;
}
@media (max-width: 700px) {
  .hr-app-main {
    flex-direction: column !important;
    gap: 0 !important;
  }
  .leave-request {
    min-width: 0 !important;
    width: 100% !important;
  }
  .profile-card {
    flex: unset !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    padding: 16px !important;
  }
  .leave-request {
    padding: 12px !important;
    margin: 12px 0 0 0 !important;
  }
  .sidebar {
    margin: 0 0 12px 0 !important;
    padding: 16px !important;
    font-size: 22px !important;
  }
  .leave-row {
    font-size: 16px !important;
    padding: 10px !important;
    margin-bottom: 10px !important;
  }
  .hr-app-container {
    padding: 8px !important;
    margin: 8px !important;
    border-radius: 16px !important;
  }
  .hr-app-header {
    font-size: 24px !important;
    margin-bottom: 12px !important;
  }
}
`;

const App = () => (
  <div className="hr-app-container" style={{ fontFamily: 'monospace', border: '3px solid #222', borderRadius: 40, padding: 24, margin: 24, maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
    <style>{responsiveStyle}</style>
    <div className="hr-app-header" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 36, marginBottom: 24 }}>
      HR web app
    </div>
    <div className="hr-app-main" style={{ display: 'flex', gap: 16, alignItems: 'stretch' }}>
      <Sidebar />
      <ProfileCard />
    </div>
  </div>
);

export default App; 