import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, TextField, Grid } from '@mui/material';
import Gallery from './Gallery';
import axios from 'axios';

const MiniScreen = () => {
    const { id } = useParams();
    const [miniscreen, setMiniscreen] = useState(null);
    const [loading, setLoading] = useState(true);
    const [link, setLink] = useState('');

    useEffect(() => {
        const fetchMiniScreen = async () => {
            try {
                const res = await axios.get(`/api/miniscreen/${id}`);
                setMiniscreen(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchMiniScreen();
    }, [id]);

    const handleLinkSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/miniscreen', {
                screenId: id,
                title: `Screen ${id}`,
                content: link,
                businessOwner: 'Business Owner Name'
            });
            setMiniscreen(res.data);
            setLink('');
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (!miniscreen) return <Typography>Mini Screen not found</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {miniscreen.title || `Screen ${id}`}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Business Owner: {miniscreen.businessOwner}
            </Typography>
            
            <Box sx={{ my: 3 }}>
                <Typography variant="body1" paragraph>
                    {miniscreen.content}
                </Typography>
            </Box>
            
            <Gallery screenId={id} />
            
            <Box component="form" onSubmit={handleLinkSubmit} sx={{ mt: 3 }}>
                <TextField
                    fullWidth
                    label="Paste link here"
                    variant="outlined"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button type="submit" variant="contained" color="primary">
                    Add to Screen
                </Button>
            </Box>
        </Box>
    );
};

export default MiniScreen;
