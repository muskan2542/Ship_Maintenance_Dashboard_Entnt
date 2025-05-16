import React, { useEffect, useState } from 'react';
import '../../styles/main.css'; // adjust the path if needed

const KPICards = () => {
    const [ships, setShips] = useState([]);
    const [components, setComponents] = useState([]);
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        setShips(JSON.parse(localStorage.getItem('ships')) || []);
        setComponents(JSON.parse(localStorage.getItem('components')) || []);
        setJobs(JSON.parse(localStorage.getItem('jobs')) || []);
    }, []);

    const overdueComponents = components.filter(c => new Date(c.lastMaintenanceDate) < new Date());
    const jobsInProgress = jobs.filter(j => j.status === 'Open' || j.status === 'In Progress');
    const jobsCompleted = jobs.filter(j => j.status === 'Completed');

    return (
        <div className="kpi-cards">
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
                <p>{jobsInProgress.length}</p>
            </div>
            <div className="kpi-card">
                <h3>Jobs Completed</h3>
                <p>{jobsCompleted.length}</p>
            </div>
        </div>
    );
};

export default KPICards;
