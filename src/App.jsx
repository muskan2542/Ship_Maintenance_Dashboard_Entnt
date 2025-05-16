import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { ShipsProvider } from './contexts/ShipsContext';
import { ComponentsProvider } from './contexts/ComponentsContext';
import { JobsProvider } from './contexts/JobsContext';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ComponentsPage from './pages/ComponentsPage';
import JobsPage from './pages/JobsPage';
import JobCalendar from './components/Jobs/JobCalendar';

import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

const ProtectedLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const initialData = {
  users: [
    { id: "1", role: "Admin", email: "admin@entnt.in", password: "admin123" },
    { id: "2", role: "Inspector", email: "inspector@entnt.in", password: "inspect123" },
    { id: "3", role: "Engineer", email: "engineer@entnt.in", password: "engine123" }
  ],
  ships: [
    { id: "s1", name: "Ever Given", imo: "9811000", flag: "Panama", status: "Active" },
    { id: "s2", name: "Maersk Alabama", imo: "9164263", flag: "USA", status: "Under Maintenance" }
  ],
  components: [
    { id: "c1", shipId: "s1", name: "Main Engine", serialNumber: "ME-1234", installDate: "2020-01-10", lastMaintenanceDate: "2024-03-12" },
    { id: "c2", shipId: "s2", name: "Radar", serialNumber: "RAD-5678", installDate: "2021-07-18", lastMaintenanceDate: "2023-12-01" }
  ],
  jobs: [
    {
      id: "j1",
      componentId: "c1",
      shipId: "s1",
      type: "Inspection",
      priority: "High",
      status: "Open",
      assignedEngineerId: "3",
      scheduledDate: "2025-05-16"
    },
    {
      id: "j2",
      componentId: "c2",
      shipId: "s2",
      type: "Maintenance",
      priority: "Medium",
      status: "In Progress",
      assignedEngineerId: "2",
      scheduledDate: "2025-05-18"
    },
    {
      id: "j3",
      componentId: "c2",
      shipId: "s2",
      type: "Repair",
      priority: "Low",
      status: "Closed",
      assignedEngineerId: "1",
      scheduledDate: "2025-05-20"
    }
  ]
};





const App = () => {
  useEffect(() => {
    if (!localStorage.getItem('appData')) {
      localStorage.setItem('appData', JSON.stringify(initialData));
    }

    const appData = JSON.parse(localStorage.getItem('appData'));

    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(appData.users));
    }
    if (!localStorage.getItem('ships')) {
      localStorage.setItem('ships', JSON.stringify(appData.ships));
    }
    if (!localStorage.getItem('components')) {
      localStorage.setItem('components', JSON.stringify(appData.components));
    }
    if (!localStorage.getItem('jobs')) {
      localStorage.setItem('jobs', JSON.stringify(appData.jobs));
    }
  }, []);

  return (
    <AuthProvider>
      <ShipsProvider>
        <ComponentsProvider>
          <JobsProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <ProtectedLayout>
                        <DashboardPage />
                      </ProtectedLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/ships"
                  element={
                    <PrivateRoute>
                      <ProtectedLayout>
                        <ShipsPage />
                      </ProtectedLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/components"
                  element={
                    <PrivateRoute>
                      <ProtectedLayout>
                        <ComponentsPage />
                      </ProtectedLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/jobs"
                  element={
                    <PrivateRoute>
                      <ProtectedLayout>
                        <JobsPage />
                      </ProtectedLayout>
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/jobcalendar"
                  element={
                    <PrivateRoute>
                      <ProtectedLayout>
                        <JobCalendar />
                      </ProtectedLayout>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Router>
          </JobsProvider>
        </ComponentsProvider>
      </ShipsProvider>
    </AuthProvider>
  );
};

export default App;


