import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateRoomModal() {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
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
      url: `${process.env.REACT_APP_API_ENDPOINT}:3001/rooms/`, // eslint-disable-line
      data: {
        roomName: roomNameValue,
        detail: detailValue,
      },
    }).then((res) => {
      console.log('res', res.data);
      navigate(`/rooms/${roomNameValue}`, { state: { roomName: roomNameValue } });
    });

    setOpen(false);
  };

  return (
    <div>
      <Fab
        color='primary'
        aria-label='add'
        onClick={handleClickOpen}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
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
