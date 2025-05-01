import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { name, email, password, confirmPassword } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('/api/auth/register', {
                name,
                email,
                password
            });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
            console.error(err.response?.data);
        }
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            <form onSubmit={onSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
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
                <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
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
                    Register
                </Button>
            </form>
            <Grid container sx={{ mt: 2 }}>
                <Grid item>
                    <Typography variant="body2">
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Register;
