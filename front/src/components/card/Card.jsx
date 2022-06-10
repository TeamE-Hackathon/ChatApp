import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default function ActionAreaCard(props) {
  console.log('p', props);
  const { RoomName: roomName, CreatedAt: createdAt, Detail: detail } = props; // eslint-disable-line no-unused-vars
  const imageUrl = 'https://picsum.photos/150';
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
