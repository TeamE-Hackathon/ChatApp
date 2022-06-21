import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen} sx={{ marginTop: 5 }}>
        プロフィールを編集する
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>プロフィール編集</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField autoFocus margin='dense' id='name' label='Name' type='name' fullWidth variant='standard' />
          <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='password'
            label='Password'
            type='password'
            fullWidth
            variant='standard'
          />
          <TextField
            autoFocus
            margin='dense'
            id='twitterid'
            label='TwitterID'
            type='id'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
