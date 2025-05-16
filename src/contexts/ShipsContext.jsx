import React, { createContext, useState, useEffect } from 'react';

export const ShipsContext = createContext();

export const ShipsProvider = ({ children }) => {
    const [ships, setShips] = useState([]);

    useEffect(() => {
        const savedShips = JSON.parse(localStorage.getItem('ships')) || [];
        setShips(savedShips);
    }, []);

    const saveShips = (updatedShips) => {
        localStorage.setItem('ships', JSON.stringify(updatedShips));
        setShips(updatedShips);
    };

    return (
        <ShipsContext.Provider value={{ ships, saveShips }}>
            {children}
        </ShipsContext.Provider>
    );
};
