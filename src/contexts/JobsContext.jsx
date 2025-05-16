import React, { createContext, useState, useEffect } from 'react';

export const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const savedJobs = JSON.parse(localStorage.getItem('jobs')) || [];
        setJobs(savedJobs);
    }, []);

    const saveJobs = (updatedJobs) => {
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
        setJobs(updatedJobs);
    };

    return (
        <JobsContext.Provider value={{ jobs, saveJobs }}>
            {children}
        </JobsContext.Provider>
    );
};
