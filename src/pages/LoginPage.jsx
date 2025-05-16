import React from 'react';
import LoginForm from '../components/Authentication/LoginForm';
import '../styles/main.css';  // Import your main.css

const LoginPage = () => {
    return (
        <div className="login-page-container">
            <LoginForm />
        </div>
    );
};

export default LoginPage;
