import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Grid, Typography, Card, CardContent, TextField, Button } from '@mui/material';
import axios from 'axios';

const Dashboard = () => {
    const [miniscreens, setMiniscreens] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const searchTerm = searchParams.get('search');

    useEffect(() => {
        const fetchMiniScreens = async () => {
            try {
                let url = '/api/miniscreen';
                if (searchTerm) {
                    url += `?search=${searchTerm}`;
                }
                
                const res = await axios.get(url);
                setMiniscreens(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchMiniScreens();
    }, [searchTerm]);

    const handleScreenClick = (screenId) => {
        navigate(`/miniscreen/${screenId}`);
    };

    if (loading) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Mini Screens
            </Typography>
            
            <Grid container spacing={3}>
                {Array.from({ length: 1000 }, (_, i) => i + 1).map((screenId) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={screenId}>
                        <Card 
                            onClick={() => handleScreenClick(screenId)}
                            sx={{ 
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 3
                                }
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">
                                    Screen {screenId}
                                </Typography>
                                {miniscreens.find(ms => ms.screenId === screenId) && (
                                    <Typography variant="body2" color="text.secondary">
                                        {miniscreens.find(ms => ms.screenId === screenId).businessOwner}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Dashboard;
