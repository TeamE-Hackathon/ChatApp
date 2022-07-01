import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { getAuth, updateEmail, updateProfile } from 'firebase/auth';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';

export default function FormDialog({ uid, displayName, email, photoURL, emailVerified }) {
  console.log(uid, photoURL, emailVerified);

  const [NameValue, setNameValue] = useState('');
  const [EmailValue, setEmailValue] = useState('');

  const [open, setOpen] = React.useState(false);
  const auth = getAuth();

  const handleClose = () => {
    // プロフィールを更新する
    updateProfile(auth.currentUser, {
      displayName: NameValue,
      photoURL: 'https://example.com/jane-q-user/profile.jpg',
    })
      .then((nameValue) => {
        // Profile updated!
        // ...
        displayName = nameValue;
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });

    // emailを更新する
    updateEmail(auth.currentUser, EmailValue)
      .then(() => {
        // Email updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
        console.log(error);
      });

    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
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
            defaultValue={displayName}
            type='name'
            fullWidth
            variant='standard'
            onChange={(e) => setNameValue(e.target.value)}
          />
          <TextField
            margin='dense'
            id='email'
            label='Email'
            defaultValue={email}
            type='email'
            fullWidth
            variant='standard'
            onChange={(e) => setEmailValue(e.target.value)}
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

FormDialog.propTypes = {
  uid: PropTypes.string,
  displayName: PropTypes.string,
  email: PropTypes.string,
  photoURL: PropTypes.string,
  emailVerified: PropTypes.string,
};
