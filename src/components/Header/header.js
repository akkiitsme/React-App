import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box ,IconButton} from '@mui/material';
import Avatar from '@mui/material/Avatar';

const Header = ({ userName, onLogout }) => {


  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
         Dashboard
        </Typography>
        <Box display="flex" alignItems="center">
            <IconButton color="inherit"> 
              <Avatar alt="profile" src="" />
            </IconButton>
          <Typography variant="body1" sx={{ marginRight: '16px' }}>
            {userName}
          </Typography>
          
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
            
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;