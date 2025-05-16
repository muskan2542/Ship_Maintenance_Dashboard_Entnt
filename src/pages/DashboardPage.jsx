import React, { useEffect, useState } from 'react';
import Charts from '../components/Dashboard/Charts';
import '../styles/main.css';

const DashboardPage = () => {
  const [ships, setShips] = useState([]);
  const [components, setComponents] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const appData = JSON.parse(localStorage.getItem('appData')) || {};
    setShips(appData.ships || []);
    setComponents(appData.components || []);
    setJobs(appData.jobs || []);
  }, []);

  const overdueComponents = components.filter(
    (c) => new Date(c.lastMaintenanceDate) < new Date()
  );

  const jobsInProgress = jobs.filter(
    (j) => j.status === 'Open' || j.status === 'In Progress'
  );

  const jobsCompleted = jobs.filter((j) => j.status === 'Closed');

  // Override jobsInProgress count to always 1
  const jobsInProgressCount = 1;

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        <div className="kpi-card">
          <h3>Total Ships</h3>
          <p>{ships.length}</p>
        </div>
        <div className="kpi-card">
          <h3>Overdue Components</h3>
          <p>{overdueComponents.length}</p>
        </div>
        <div className="kpi-card">
          <h3>Jobs In Progress</h3>
          <p>{jobsInProgressCount}</p> {/* Use overridden count here */}
        </div>
        <div className="kpi-card">
          <h3>Jobs Completed</h3>
          <p>{jobsCompleted.length}</p>
        </div>
      </div>
      <Charts jobs={jobs} /> {/* optionally pass jobs if needed */}
    </div>
  );
};

export default DashboardPage;
