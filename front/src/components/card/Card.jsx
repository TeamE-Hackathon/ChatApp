import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const getRandomPicture = () => {
  let photos = [];
  for (let i = 1; i <= 7; i++) {
    photos.push(`img/image${i}.jpeg`);
  }
  const min = Math.ceil(0);
  const max = Math.floor(photos.length);
  const randomIndex = Math.floor(Math.random() * (max - min) + min);
  return photos[randomIndex];
};

export default function ActionAreaCard(props) {
  const { RoomName: roomName, CreatedAt: createdAt, Detail: detail } = props; // eslint-disable-line no-unused-vars
  const imageUrl = getRandomPicture();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/rooms/${roomName}`} state={{ roomName: roomName }} style={{ textDecoration: 'none', color: 'gray' }}>
        <CardActionArea>
          <CardMedia component='img' height='140' image={imageUrl} alt={roomName} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {roomName}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {detail}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

ActionAreaCard.propTypes = {
  RoomName: PropTypes.string.isRequired,
  CreatedAt: PropTypes.string.isRequired,
  Detail: PropTypes.string.isRequired,
  // imageUrl: PropTypes.string,
};
