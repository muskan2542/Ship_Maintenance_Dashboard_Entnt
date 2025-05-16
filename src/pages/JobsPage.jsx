import React, { useEffect, useState } from 'react';
import JobList from '../components/Jobs/JobList';
import JobForm from '../components/Jobs/JobForm';
import '../styles/main.css';

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);
    const [viewingJob, setViewingJob] = useState(null);

    useEffect(() => {
        const appData = JSON.parse(localStorage.getItem('appData')) || { jobs: [] };
        setJobs(appData.jobs);
    }, []);

    const saveJobs = (updatedJobs) => {
        const appData = JSON.parse(localStorage.getItem('appData')) || {};
        const newAppData = { ...appData, jobs: updatedJobs };
        localStorage.setItem('appData', JSON.stringify(newAppData));
        setJobs(updatedJobs);
    };

    const handleSave = (job) => {
        let updatedJobs;
        if (job.id) {
            updatedJobs = jobs.map((j) => (j.id === job.id ? job : j));
        } else {
            job.id = Date.now().toString();
            updatedJobs = [...jobs, job];
        }
        saveJobs(updatedJobs);
        setEditingJob(null);
    };

    const handleDelete = (id) => {
        const updated = jobs.filter((j) => j.id !== id);
        saveJobs(updated);
    };

    const handleEdit = (job) => {
        setEditingJob(job);
    };

    const handleView = (job) => {
        setViewingJob(job);
        alert(`Viewing Job:\nType: ${job.type}\nStatus: ${job.status}\nPriority: ${job.priority}`);
    };

    return (
        <div className="jobs-page-container">
            <JobForm onSave={handleSave} editingJob={editingJob} />
            <hr className="separator-hr" />
            <JobList jobs={jobs} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
        </div>
    );
};

export default JobsPage;
