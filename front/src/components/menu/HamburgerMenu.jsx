import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

console.log(auth);

export default function HamburgerMenu() {
  const navigate = useNavigate();
  /* ↓state変数「user」を定義 */
  const [user, setUser] = useState('');
  
  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
        navigate('/sns-signin');
      })
      .catch((error) => {
        console.log({ error: error });
      });
  };

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component='nav'>
        {!user ? (
          <Link to='/sns-signin' style={{ textDecoration: 'none', color: '#1976d2' }}>
            <ListItem>
              <ListItemText primary='SIGN IN' />
            </ListItem>
          </Link>
        ) : (
          <>
            <ListItem sx={{ color: '#1976d2', cursor: 'pointer' }}>
              <ListItemText primary='SIGN OUT' onClick={userSignOut} />
            </ListItem>
            <Divider />
            <Link to={`/mypages/${user.displayName}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
              <ListItem>
                <ListItemText primary='MY PAGE' />
              </ListItem>
            </Link>
          </>
        )}
        <Divider />
      </List>

    </Box>
  );

  return (
    <div>
      {['•••'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon
            color='primary'
            sx={{ cursor: 'pointer', display: { xs: 'flex', sm: 'none' } }}
            onClick={toggleDrawer(anchor, true)}
          />
          <Drawer anchor='right' open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
