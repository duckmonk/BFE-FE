import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <Toolbar>
        <Typography
          variant="subtitle1"
          component={RouterLink}
          to="/"
          sx={{ 
            flexGrow: 1, 
            color: '#000', 
            textDecoration: 'none', 
            cursor: 'pointer',
            fontSize: '1.2rem',
            fontWeight: 600
          }}
        >
          BREAK FREE EARTH LLC
        </Typography>
        {user ? (
          <>
            {user.userType === 'client' && (
              <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/')}
                  sx={{ 
                    fontWeight: isActive('/') ? 700 : 400,
                    color: '#000'
                  }}
                >
                  Home
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/landing')}
                  sx={{ 
                    fontWeight: isActive('/landing') ? 700 : 400,
                    color: '#000'
                  }}
                >
                  Landing Page
                </Button>
              </Box>
            )}
            {user.userType === 'marketing_manager' && (
              <Box sx={{ display: 'flex', gap: 2, mr: 2 }}>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/inquiry-dashboard')}
                  sx={{ 
                    fontWeight: isActive('/inquiry-dashboard') ? 700 : 400,
                    color: '#000'
                  }}
                >
                  Inquiry Dashboard
                </Button>
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/case-detail-dashboard')}
                  sx={{ 
                    fontWeight: isActive('/case-detail-dashboard') ? 700 : 400,
                    color: '#000'
                  }}
                >
                  Case Detail Dashboard
                </Button>
              </Box>
            )}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: '#1976d2' }}>
                {user.userName?.[0]?.toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button 
            variant="contained" 
            onClick={() => navigate('/login')}
            sx={{ 
              bgcolor: '#000',
              color: '#fff',
              '&:hover': {
                bgcolor: '#333'
              }
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header; 