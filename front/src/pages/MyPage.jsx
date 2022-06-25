import Grid from '@mui/material/Grid';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import ImageAvatars from '../components/avatar/MuiAvatar';
import FormDialog from '../components/form/FormDialog';
import { auth } from '../firebase';

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
        {/* // TODO ここuserを渡す */}
        <FormDialog />
      </Grid>
    </Grid>
  );
};
