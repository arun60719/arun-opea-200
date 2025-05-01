import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
            console.error(err.response.data);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <form onSubmit={onSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>
            <Grid container sx={{ mt: 2 }}>
                <Grid item>
                    <Typography variant="body2">
                        Don't have an account? <Link to="/register">Register</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;
