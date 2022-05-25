import { Grid } from '@mui/material';
import React from 'react';
import { CreateRoomButton } from '../components/button/CreateRoomButton';
import ActionAreaCard from '../components/card/Card';

const cardContents = [
  {
    title: 'Reactについて',
    detail: 'Reactについて、なんでも話してます。',
    imageUrl: 'https://picsum.photos/150',
  },
  {
    title: 'DynamoDBについて',
    detail: 'AWSのNoSQLのサービスであるDynamoDBについて、興味ある方はぜひ',
    imageUrl: 'https://picsum.photos/150',
  },
  {
    title: '面接について',
    detail: '面接でどんな質問があったかメモみたいに書いてます',
    imageUrl: 'https://picsum.photos/150',
  },
  {
    title: '学び方について',
    detail: 'みんなどんな学習法があるか気になったので部屋作りました！',
    imageUrl: 'https://picsum.photos/150',
  },
];

const getCardContent = (getObj) => {
  return (
    <Grid item xs={12} sm={4}>
      <ActionAreaCard {...getObj} />
    </Grid>
  );
};

export const RoomsList = () => {
  return (
    <>
      <Grid container direction='column'>
        <Grid item container>
          <Grid sm={2} />
          <Grid xs={12} sm={8}>
            <Grid container spacing={2}>
              {cardContents.map((contentObj) => getCardContent(contentObj))}
            </Grid>
          </Grid>
          <Grid sm={2} />
        </Grid>
      </Grid>
      <Grid container justifyContent='center'>
        <CreateRoomButton />
      </Grid>
    </>
  );
};
