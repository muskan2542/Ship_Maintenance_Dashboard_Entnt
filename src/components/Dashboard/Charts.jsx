import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const Charts = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const appData = JSON.parse(localStorage.getItem('appData'));
        const jobData = appData?.jobs || [
            { id: "j1", componentId: "c1", shipId: "s1", type: "Inspection", priority: "High", status: "Open", assignedEngineerId: "3", scheduledDate: "2025-05-05" },
            { id: "j2", componentId: "c2", shipId: "s2", type: "Maintenance", priority: "Medium", status: "Closed", assignedEngineerId: "2", scheduledDate: "2025-05-10" },
            { id: "j3", componentId: "c1", shipId: "s1", type: "Repair", priority: "High", status: "In Progress", assignedEngineerId: "1", scheduledDate: "2025-05-15" }
        ];
        setJobs(jobData);
    }, []);

    // Normalize status: map 'Closed' to 'Completed' for consistency
    const statusCount = jobs.reduce((acc, job) => {
        let normalizedStatus = job.status === 'Closed' ? 'Completed' : job.status;
        acc[normalizedStatus] = (acc[normalizedStatus] || 0) + 1;
        return acc;
    }, {});

    const statusData = Object.entries(statusCount)
        .filter(([_, count]) => count > 0)
        .map(([status, count]) => ({
            name: status,
            value: count
        }));

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

    return (
        <div className="charts-container">
            <div className="chart-wrapper">
                <h3>Jobs by Status (Pie)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                        >
                            {statusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-wrapper">
                <h3>Jobs by Status (Bar)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={statusData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Charts;
