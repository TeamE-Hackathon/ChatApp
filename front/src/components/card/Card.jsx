import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function ActionAreaCard(props) {
    const { title, detail, imageUrl } = props;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component='img'
                    height='140'
                    image={imageUrl}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {title}
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
    title: PropTypes.string.isRequired,
    detail: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
};