import ForumIcon from '@mui/icons-material/Forum';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import HamburgerMenu from '../menu/HamburgerMenu';

console.log(auth);

const HeaderLeft = styled('div')({
  flex: 4,
  display: 'flex',
  alignItems: 'center',
});

const HeaderRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

export default function Header() {
  /* ↓state変数「user」を定義 */
  const [user, setUser] = useState('');

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, borderBottom: 3, marginBottom: '10vh' }}>
      <AppBar sx={{ position: 'fixed', backgroundColor: 'white', borderBottom: 3, borderColor: '#1976d2' }}>
        <Toolbar>
          <HeaderLeft>
            <div className='headerLogo'>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                <ForumIcon color='primary' sx={{ fontSize: '40px', marginTop: '10px', marginRight:'5px' }} />
              </Link>
            </div>
            <div className='headerTitle'>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <Typography
                  variant='h6'
                  component='div'
                  color='primary'
                  sx={{ flexGrow: 1, fontStyle: 'oblique', fontSize: '30px' }}
                >
                  Chat App
                </Typography>
              </Link>
            </div>
          </HeaderLeft>
          <HeaderRight>
            {!user ? (
              <Link to='/signin' style={{ textDecoration: 'none' }}>
                <Button variant='outlined' sx={{ marginRight: '10px', display: { xs: 'none', sm: 'flex' } }}>
                  Sign in
                </Button>
              </Link>
            ) : (
              <>
                <Button variant='outlined' sx={{ marginRight: '10px', display: { xs: 'none', sm: 'flex' } }}>
                  Sign out
                </Button>
                <Link to={`/mypages/${user.displayName}`} style={{ textDecoration: 'none' }}>
                  <Button variant='outlined' sx={{ marginRight: '10px', display: { xs: 'none', sm: 'flex' } }} >
                    My Page
                  </Button>
                </Link>
              </>
            )}
            <HamburgerMenu />
          </HeaderRight>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
