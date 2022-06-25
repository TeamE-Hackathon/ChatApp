import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import * as React from 'react';

// TODO: propsとして受け取る
// textFieldにplaceholderとしてセットする
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
      <Button variant='contained' onClick={handleClickOpen} sx={{ marginTop: 5 }}>
        プロフィールを編集する
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>プロフィール編集</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField autoFocus margin='dense' id='name' label='名前' type='name' fullWidth variant='standard' />
          <TextField autoFocus margin='dense' id='email' label='Email' type='email' fullWidth variant='standard' />
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
          <TextField
            autoFocus
            margin='dense'
            id='skill'
            label='技術スタック'
            type='text'
            fullWidth
            variant='standard'
          />
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
