import Grid from '@mui/material/Grid';
import { useEffect, useState } from 'react';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

import ImageAvatars from '../components/avatar/MuiAvatar';

// import ActionAreaCard from '../components/card/Card';
import FormDialog from '../components/form/FormDialog';

export const MyPage = () => {
  const [user, setUser] = useState('');
  console.log('user', user);

  let displayName;
  if (user) {
    displayName = user.displayName;
  }

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item>
        <ImageAvatars displayName={displayName} />
      </Grid>
      <Grid item xs={12}>
        <FormDialog />
      </Grid>
    </Grid>
  );
};
