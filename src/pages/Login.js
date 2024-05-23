import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/background.jpeg'; 

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div style={{ ...styles.container, backgroundImage: `url(${backgroundImage})` }}> 
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>Login</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label htmlFor="email" style={styles.label}>Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label htmlFor="password" style={styles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={{ ...styles.button, fontSize: '16px' }}>Login</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    formContainer: {
        background: 'rgba(255, 230, 230, 0.85)', 
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)', 
        width: '350px',
        backdropFilter: 'blur(10px)', 
    },
    heading: {
        margin: '0 0 20px',
        textAlign: 'center',
        color: '#7469B6',
        fontFamily: 'Dancing Script, cursive',
        fontSize: '2rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        marginBottom: '5px',
        color: '#7469B6',
        fontFamily: 'Comic Sans MS, cursive, sans-serif',
    },
    input: {
        padding: '10px',
        borderRadius: '8px',
        border: '1px solid #AD88C6',
        fontFamily: 'Comic Sans MS, cursive, sans-serif',
        width: '93.5%', 
    },
    button: {
        padding: '10px',
        border: 'none',
        backgroundColor: '#7469B6',
        color: '#fff',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: 'Comic Sans MS, cursive, sans-serif',
        transition: 'background-color 0.3s ease',
        fontSize: '16px', 
    },
    buttonHover: {
        backgroundColor: '#5a4c9e',
    },
};

export default Login;
