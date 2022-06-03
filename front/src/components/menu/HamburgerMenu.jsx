import MenuIcon from '@mui/icons-material/Menu';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import { Link } from 'react-router-dom';
import './HamburgerMenu.css';

export default function HamburgerMenu() {
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
        <Link to='/signin' style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem>
            <ListItemText primary='MY PAGE' />
          </ListItem>
        </Link>
        <Link to='/signin' style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem>
            <ListItemText primary='SIGN IN' />
          </ListItem>
        </Link>
        <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
          <ListItem>
            <ListItemText primary='SIGN OUT' />
          </ListItem>
        </Link>
      </List>
      <Divider />

    </Box>
  );

  return (
    <div>
      {['•••'].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon
            style={{ color: 'blue', cursor: 'pointer' }}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            onClick={toggleDrawer(anchor, true)}
          />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
