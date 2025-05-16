import React, { useEffect, useState } from 'react';
import ShipList from '../components/ships/ShipList';
import ShipForm from '../components/ships/ShipForm';
import ShipDetail from '../components/ships/ShipDetail';
import '../styles/main.css';

const ShipsPage = () => {
    const [ships, setShips] = useState([]);
    const [editingShip, setEditingShip] = useState(null);
    const [selectedShip, setSelectedShip] = useState(null);

    useEffect(() => {
        // Load entire appData from localStorage
        const appData = JSON.parse(localStorage.getItem('appData')) || { ships: [] };
        setShips(appData.ships);
    }, []);

    const saveShips = (updatedShips) => {
        // Get current appData
        const appData = JSON.parse(localStorage.getItem('appData')) || {};
        // Update ships array inside appData
        const newAppData = { ...appData, ships: updatedShips };
        // Save back to localStorage
        localStorage.setItem('appData', JSON.stringify(newAppData));
        setShips(updatedShips);
    };

    const handleSave = (ship) => {
        let updatedShips;
        if (ship.id) {
            updatedShips = ships.map((s) => (s.id === ship.id ? ship : s));
        } else {
            ship.id = Date.now().toString();
            updatedShips = [...ships, ship];
        }
        saveShips(updatedShips);
        setEditingShip(null);
        setSelectedShip(null);
    };

    const handleDelete = (id) => {
        const updated = ships.filter((ship) => ship.id !== id);
        saveShips(updated);
        if (selectedShip?.id === id) setSelectedShip(null);
    };

    const handleEdit = (ship) => {
        setEditingShip(ship);
    };

    const handleView = (ship) => {
        setSelectedShip(ship);
    };

    return (
        <div className="ships-page-container">
            <ShipForm onSave={handleSave} editingShip={editingShip} />
            <hr className="ships-page-hr" />
            <ShipList ships={ships} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />
            <hr className="ships-page-hr" />
            <ShipDetail ship={selectedShip} />
        </div>
    );
};

export default ShipsPage;
