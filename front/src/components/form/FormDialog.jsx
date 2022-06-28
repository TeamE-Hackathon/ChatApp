import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { getAuth, onAuthStateChanged, updateEmail, updateProfile } from 'firebase/auth';
import * as React from 'react';
import { useEffect, useState } from 'react';

// TODO: propsとして受け取る
// textFieldにplaceholderとしてセットする
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [setUser] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // プロフィールを更新する
  updateProfile(auth.currentUser, {
    displayName: 'Jane Q. User',
    photoURL: 'https://example.com/jane-q-user/profile.jpg',
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch(() => {
      // An error occurred
      // ...
    });

  // emailを更新する
  updateEmail(auth.currentUser, 'user@example.com')
    .then(() => {
      // Email updated!
      // ...
    })
    .catch(() => {
      // An error occurred
      // ...
    });

  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;

    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.
    const uid = user.uid;
    console.log(displayName, email, photoURL, emailVerified, uid);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen} sx={{ marginTop: 5 }}>
        プロフィールを編集する
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>プロフィール編集</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            margin='dense'
            id='name'
            label='名前'
            defaultValue={user.displayName}
            type='name'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            id='email'
            label='Email'
            defaultValue={user.email}
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField margin='dense' id='twitterid' label='TwitterID' type='id' fullWidth variant='standard' />
          <TextField margin='dense' id='skill' label='技術スタック' type='text' fullWidth variant='standard' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined'>
            キャンセル
          </Button>
          <Button onClick={handleClose} variant='contained'>
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
