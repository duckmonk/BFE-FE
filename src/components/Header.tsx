import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { userApi } from '../services/api';
import { clearUserInfo, getUserInfo } from '../utils/user';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const user = getUserInfo();

  const handleLogout = async () => {
    try {
      await userApi.logout();
    } catch (e) {
      // 可以根据需要处理错误
    }
    clearUserInfo();
    navigate('/');
    window.location.reload();
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
        <Box>
          {!user && (
            <>
              <Button 
                component={RouterLink} 
                to="/about"
                sx={{ color: '#000', textTransform: 'none' }}
              >
                Service Details
              </Button>
              <Button 
                component={RouterLink} 
                to="/sample-case"
                sx={{ color: '#000', textTransform: 'none' }}
              >
                Sample Case
              </Button>
            </>
          )}
          {/* <Button color="inherit" component={RouterLink} to="/review">
            Review
          </Button> */}
          {user ? (
            <>
              <Typography sx={{ color: '#000', display: 'inline', ml: 2, mr: 1 }}>
                {user.userName}
              </Typography>
              <Button
                onClick={handleLogout}
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  textTransform: 'none',
                  ml: 1,
                  '&:hover': { bgcolor: '#222' }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              sx={{
                bgcolor: '#000',
                color: '#fff',
                textTransform: 'none',
                ml: 2,
                '&:hover': { bgcolor: '#222' }
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 