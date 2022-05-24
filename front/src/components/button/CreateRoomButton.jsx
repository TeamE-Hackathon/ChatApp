import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

export const CreateRoomButton = () => {
    return(
        <Button
            variant='outlined'
            component={Link}
            to='/rooms/new'
            startIcon={<AddIcon />}>部屋を作る
        </Button>
    );
};