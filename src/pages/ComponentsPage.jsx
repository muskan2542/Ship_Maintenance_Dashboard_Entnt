import React, { useEffect, useState } from 'react';
import ComponentList from '../components/Components/ComponentList';
import ComponentForm from '../components/Components/ComponentForm';
import '../styles/main.css';

const ComponentsPage = () => {
    const [components, setComponents] = useState([]);
    const [editingComponent, setEditingComponent] = useState(null);
    const [viewingComponent, setViewingComponent] = useState(null);

    useEffect(() => {
        const appData = JSON.parse(localStorage.getItem('appData')) || { components: [] };
        setComponents(appData.components);
    }, []);

    const saveComponents = (updatedComponents) => {
        const appData = JSON.parse(localStorage.getItem('appData')) || {};
        const newAppData = { ...appData, components: updatedComponents };
        localStorage.setItem('appData', JSON.stringify(newAppData));
        setComponents(updatedComponents);
    };

    const handleSave = (component) => {
        let updatedComponents;
        if (component.id) {
            updatedComponents = components.map((c) => (c.id === component.id ? component : c));
        } else {
            component.id = Date.now().toString();
            updatedComponents = [...components, component];
        }
        saveComponents(updatedComponents);
        setEditingComponent(null);
    };

    const handleDelete = (id) => {
        const updated = components.filter((c) => c.id !== id);
        saveComponents(updated);
    };

    const handleEdit = (component) => {
        setEditingComponent(component);
    };

    const handleView = (component) => {
        setViewingComponent(component);
        alert(`Viewing Component:\n${component.name}`);
    };

    return (
        <div className="components-page-container">
            <ComponentForm onSave={handleSave} editingComponent={editingComponent} />
            <hr className="components-page-hr" />
            <ComponentList
                components={components}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />
        </div>
    );
};

export default ComponentsPage;
