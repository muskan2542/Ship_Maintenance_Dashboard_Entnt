import React, { createContext, useState, useEffect } from 'react';

export const ComponentsContext = createContext();

export const ComponentsProvider = ({ children }) => {
    const [components, setComponents] = useState([]);

    useEffect(() => {
        const savedComponents = JSON.parse(localStorage.getItem('components')) || [];
        setComponents(savedComponents);
    }, []);

    const saveComponents = (updatedComponents) => {
        localStorage.setItem('components', JSON.stringify(updatedComponents));
        setComponents(updatedComponents);
    };

    return (
        <ComponentsContext.Provider value={{ components, saveComponents }}>
            {children}
        </ComponentsContext.Provider>
    );
};
