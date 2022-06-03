import ForumIcon from '@mui/icons-material/Forum';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerMenu from '../menu/HamburgerMenu';
import './Header.css';

export default function Header() {

  return (
    <Box sx={{ flexGrow: 1, borderBottom: 3, borderColor: 'blue' }}>
      <AppBar style={{ position: 'fixed', backgroundColor: 'white' }}>
        <Toolbar>
          <div className='headerLeft'>
            <div className='headerLogo'>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                <ForumIcon style={{ fontSize: '40px', color: 'blue', marginTop: '10px' }} />
              </Link>
            </div>
            <div className='headerTitle'>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                <Typography
                  variant='h6'
                  component='div'
                  sx={{ flexGrow: 1 }}
                  style={{ fontStyle: 'oblique', fontSize: '30px', color: 'blue' }}
                >
                  Chat App
                </Typography>
              </Link>
            </div>
          </div>
          <div className='headerRight'>
            <Link to='/signin' style={{ textDecoration: 'none', color: 'white' }}>
              <Button variant='outlined' style={{ marginRight: '10px' }} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                My Page
              </Button>
            </Link>
            <Link to='/signin' style={{ textDecoration: 'none', color: 'white' }}>
              <Button variant='outlined' style={{ marginRight: '10px' }} sx={{ display: { xs: 'none', sm: 'flex' } }}>
                Sign in
              </Button>
            </Link>
            <Button variant='outlined' style={{ marginRight: '10px' }} sx={{ display: { xs: 'none', sm: 'flex' } }}>
              Sign out
            </Button>
            <HamburgerMenu />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
