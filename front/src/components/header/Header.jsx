import ForumIcon from '@mui/icons-material/Forum';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <div className='headerLeft'>
            <div className='headerLogo'>
              <Link to='/'>
                <ForumIcon />
              </Link>
            </div>
            <div className='headerTitle'>
              <Link to='/'>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                  Chat App
                </Typography>
              </Link>
            </div>
          </div>
          <div className='headerRight'>
            <Button color='inherit'>Login</Button>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
