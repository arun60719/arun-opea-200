import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const Gallery = ({ screenId }) => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const res = await axios.get(`/api/miniscreen/${screenId}`);
                setImages(res.data.gallery || []);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchGallery();
    }, [screenId]);

    const onDrop = async (acceptedFiles) => {
        const formData = new FormData();
        formData.append('image', acceptedFiles[0]);
        formData.append('miniScreenId', screenId);

        try {
            const res = await axios.post('/api/gallery', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setImages([...images, res.data]);
        } catch (err) {
            console.error(err);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    if (loading) return <Typography>Loading gallery...</Typography>;

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Gallery
            </Typography>
            
            <Grid container spacing={2}>
                {images.map((image, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                            component="img"
                            src={image.url}
                            alt={`Gallery item ${index}`}
                            sx={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: 1
                            }}
                        />
                    </Grid>
                ))}
                
                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        {...getRootProps()}
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: 1,
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '200px',
                            cursor: 'pointer',
                            '&:hover': {
                                borderColor: '#666'
                            }
                        }}
                    >
                        <input {...getInputProps()} />
                        <AddPhotoAlternateIcon fontSize="large" />
                        <Typography variant="body2">
                            Drag & drop images here or click to select
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Gallery;
