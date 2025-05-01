import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h2" gutterBottom>
                Farmer Assistance Platform
            </Typography>
            <Typography variant="h5" gutterBottom>
                Access 1000 mini screens with gallery functionality
            </Typography>
            <Button 
                variant="contained" 
                size="large" 
                component={Link} 
                to="/dashboard"
                sx={{ mt: 3 }}
            >
                Explore Screens
            </Button>
        </Box>
    );
};

export default Home;
