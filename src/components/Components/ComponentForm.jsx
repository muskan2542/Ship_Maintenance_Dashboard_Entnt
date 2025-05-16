import React, { useState, useEffect } from 'react';
import '../../styles/main.css'; // adjust path if needed

const ComponentForm = ({ onSave, editingComponent }) => {
    const [formData, setFormData] = useState({
        name: '',
        serialNumber: '',
        installDate: '',
        lastMaintenanceDate: ''
    });

    useEffect(() => {
        if (editingComponent) {
            setFormData(editingComponent);
        } else {
            setFormData({ name: '', serialNumber: '', installDate: '', lastMaintenanceDate: '' });
        }
    }, [editingComponent]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({ name: '', serialNumber: '', installDate: '', lastMaintenanceDate: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="component-form">
            <h2>{editingComponent ? 'Edit Component' : 'Add Component'}</h2>
            <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                name="serialNumber"
                placeholder="Serial Number"
                value={formData.serialNumber}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="installDate"
                placeholder="Installation Date"
                value={formData.installDate}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="lastMaintenanceDate"
                placeholder="Last Maintenance Date"
                value={formData.lastMaintenanceDate}
                onChange={handleChange}
                required
            />
            <button type="submit">{editingComponent ? 'Update' : 'Add'}</button>
        </form>
    );
};

export default ComponentForm;
