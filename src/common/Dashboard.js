import React from 'react';

import DashboardSidebar from './DashboardSideBar';

import "./Dashboard.scss";

const Dashboard = () => {
  return (
      <div className="Dashboard">
        <DashboardSidebar/> 
        <main class="main"></main>
      </div>
  )
}

export default Dashboard;