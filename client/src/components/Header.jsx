import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, TextField, Button, IconButton, Menu, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/dashboard?search=${searchTerm}`);
        }
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Farmer Assistance
                </Typography>
                
                <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        size="small"
                        variant="outlined"
                        placeholder="Paste link or search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: 1, mr: 1 }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="secondary"
                        startIcon={<SearchIcon />}
                    >
                        Search
                    </Button>
                </form>
                
                <div style={{ marginLeft: '20px' }}>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
