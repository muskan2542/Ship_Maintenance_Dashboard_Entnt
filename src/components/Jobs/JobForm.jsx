import React, { useState, useEffect } from 'react';
import '../../styles/main.css';

const JobForm = ({ onSave, editingJob }) => {
    const [formData, setFormData] = useState({
        type: '',
        shipId: '',
        componentId: '',
        priority: '',
        status: '',
        scheduledDate: ''
    });

    useEffect(() => {
        if (editingJob) {
            setFormData(editingJob);
        } else {
            setFormData({
                type: '',
                shipId: '',
                componentId: '',
                priority: '',
                status: '',
                scheduledDate: ''
            });
        }
    }, [editingJob]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({
            type: '',
            shipId: '',
            componentId: '',
            priority: '',
            status: '',
            scheduledDate: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="job-form">
            <h2>{editingJob ? 'Edit Job' : 'Add Job'}</h2>

            <input
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleChange}
                required
            />

            <input
                name="shipId"
                placeholder="Ship ID"
                value={formData.shipId}
                onChange={handleChange}
                required
            />

            <input
                name="componentId"
                placeholder="Component ID"
                value={formData.componentId}
                onChange={handleChange}
                required
            />

            <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
            >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
            >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

            <input
                type="date"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                required
            />

            <button type="submit">{editingJob ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default JobForm;
