import Grid from '@mui/material/Grid';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import ImageAvatars from '../components/avatar/MuiAvatar';
import FormDialog from '../components/form/FormDialog';
import { auth } from '../firebase';

export const MyPage = () => {
  const [user, setUser] = useState({ uid: '', displayName: '', email: '', photoURL: '', emailVerified: '' });
  console.log('user', user);

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      console.log('currentUser??', currentUser);
      setUser({
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        emailVerified: currentUser.emailVerified,
      });
    });
  }, []);

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item>
        <ImageAvatars displayName={user.displayName} photoURL={user.photoURL} />
      </Grid>
      <Grid item xs={12}>
        {/* // TODO ここuserを渡す */}
        <FormDialog {...user} />
      </Grid>
    </Grid>
  );
};
