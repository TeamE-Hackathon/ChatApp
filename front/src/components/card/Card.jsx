import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function ActionAreaCard(props) {
  console.log('p', props);
  const { room_name, created_at, detail } = props; // eslint-disable-line no-unused-vars
  const imageUrl = 'https://picsum.photos/150';
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component='img' height='140' image={imageUrl} alt={room_name} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {room_name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ActionAreaCard.propTypes = {
  room_name: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  detail: PropTypes.string.isRequired,
  // imageUrl: PropTypes.string,
};
