import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function CreateRoomModal({ url }) {
  const [open, setOpen] = useState(false);
  console.log(url);

  const [roomNameValue, setRoomNameValue] = useState('');
  const [detailValue, setDetailValue] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubscribe = () => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/rooms/',
      data: {
        roomName: roomNameValue,
        detail: detailValue,
      },
    }).then((res) => {
      console.log('res', res.data);
      window.location.href = '/rooms/' + roomNameValue;
    });

    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        部屋を作成する
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>新しく部屋を作成する</DialogTitle>
        <DialogContent>
          <DialogContentText>タイトル：技術名や学び方といったトピックを入力してください</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='roomName'
            label='タイトル(必須)'
            type='email'
            fullWidth
            variant='standard'
            value={roomNameValue}
            onChange={(e) => setRoomNameValue(e.target.value)}
          />
          <TextField
            autoFocus
            margin='dense'
            id='detail'
            label='詳細'
            type='email'
            fullWidth
            variant='standard'
            value={detailValue}
            onChange={(e) => setDetailValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSubscribe}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateRoomModal.propTypes = {
  url: PropTypes.string,
};
