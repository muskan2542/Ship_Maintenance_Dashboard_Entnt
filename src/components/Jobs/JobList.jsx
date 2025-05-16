import React from 'react';

const JobList = ({ jobs, onEdit, onDelete, onView = () => { } }) => {
    return (
        <div>
            <h2>Maintenance Jobs</h2>
            <table className="job-list-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Ship ID</th>
                        <th>Component ID</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Scheduled Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.length === 0 && (
                        <tr className="job-list-empty-row">
                            <td colSpan="7">No jobs available.</td>
                        </tr>
                    )}
                    {jobs.map((job) => (
                        <tr key={job.id}>
                            <td>{job.type}</td>
                            <td>{job.shipId}</td>
                            <td>{job.componentId}</td>
                            <td>{job.priority}</td>
                            <td>{job.status}</td>
                            <td>{job.scheduledDate}</td>
                            <td className="actions">
                                <button onClick={() => onView(job)}>View</button>{' '}
                                <button onClick={() => onEdit(job)}>Edit</button>{' '}
                                <button onClick={() => onDelete(job.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default JobList;
