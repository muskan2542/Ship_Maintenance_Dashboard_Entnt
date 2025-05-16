import React from 'react';
import '../../styles/main.css'; // adjust path if needed

const ShipDetail = ({ ship }) => {
    if (!ship) return <p>No ship selected.</p>;

    return (
        <div className="ship-detail-container">
            <h2>Ship Profile: {ship.name}</h2>
            <ul>
                <li><strong>IMO:</strong> {ship.imo}</li>
                <li><strong>Flag:</strong> {ship.flag}</li>
                <li><strong>Status:</strong> {ship.status}</li>
            </ul>
            {/* Future: linked components and job history here */}
        </div>
    );
};

export default ShipDetail;
