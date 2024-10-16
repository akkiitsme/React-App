import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        bgcolor: 'background.default',
        color: 'text.primary',
        textAlign: 'center',
        py: 2,
      }}
    >
      <Typography variant="body2">
        © Copyright {new Date().getFullYear()} - Akshay singh. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;