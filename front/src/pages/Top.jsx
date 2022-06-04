import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ActionAreaCard from '../components/card/Card';
import { CreateRoomModal } from './../components/modal/CreateRoomModal';

const getCardContent = (getObj) => {
  return (
    <Grid item xs={12} sm={4}>
      <ActionAreaCard {...getObj} />
    </Grid>
  );
};

export const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const url = '/newRoom';
  useEffect(() => {
    axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'http://localhost:3001/';
    axios.get('http://localhost:3001/rooms').then((res) => {
      console.log('res.data', res.data);
      setRooms(res.data);
    });
  }, []);

  return (
    <>
      <Grid container direction='column'>
        <Grid item container>
          <Grid sm={2} />
          <Grid xs={12} sm={8}>
            <Grid container spacing={2}>
              {rooms.map((contentObj) => getCardContent(contentObj))}
            </Grid>
          </Grid>
          <Grid sm={2} />
        </Grid>
      </Grid>
      <CreateRoomModal url={url} />
    </>
  );
};
