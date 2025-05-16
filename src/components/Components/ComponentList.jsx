import React from 'react';
import '../../styles/main.css'; // Adjust the path if necessary

const ComponentList = ({ components, onEdit, onDelete, onView }) => {
    const safeOnView = onView || (() => { });

    return (
        <div className="component-list">
            <h2>Ship Components</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Serial Number</th>
                        <th>Install Date</th>
                        <th>Last Maintenance Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {components.map((component) => (
                        <tr key={component.id} className="border-bottom">
                            <td>{component.name}</td>
                            <td>{component.serialNumber}</td>
                            <td>{component.installDate}</td>
                            <td>{component.lastMaintenanceDate}</td>
                            <td>
                                <button onClick={() => safeOnView(component)} className="button">View</button>{' '}
                                <button onClick={() => onEdit(component)} className="button">Edit</button>{' '}
                                <button onClick={() => onDelete(component.id)} className="button">Delete</button>
                            </td>
                        </tr>
                    ))}
                    {components.length === 0 && (
                        <tr className="empty-row">
                            <td colSpan="5">No components available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ComponentList;
