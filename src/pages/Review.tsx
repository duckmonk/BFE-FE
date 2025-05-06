import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Review: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#fafafa' }}>
      <Container maxWidth="lg" sx={{ flex: 1 }}>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Review
          </Typography>
          <Typography variant="body1">
            Review content
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Review; 