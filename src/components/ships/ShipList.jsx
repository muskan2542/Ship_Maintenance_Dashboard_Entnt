import React from 'react';
import '../../styles/main.css'; // adjust path if necessary

const ShipList = ({ ships, onEdit, onDelete, onView }) => {
    const safeOnView = onView || (() => { });

    return (
        <div>
            <h2>All Ships</h2>
            <table className="ship-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>IMO</th>
                        <th>Flag</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ships.length === 0 && (
                        <tr>
                            <td colSpan="5" className="no-ships">
                                No ships available.
                            </td>
                        </tr>
                    )}
                    {ships.map(ship => (
                        <tr key={ship.id}>
                            <td>{ship.name}</td>
                            <td>{ship.imo}</td>
                            <td>{ship.flag}</td>
                            <td>{ship.status}</td>
                            <td className="actions">
                                <button onClick={() => safeOnView(ship)}>View</button>{' '}
                                <button onClick={() => onEdit(ship)}>Edit</button>{' '}
                                <button onClick={() => onDelete(ship.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShipList;
