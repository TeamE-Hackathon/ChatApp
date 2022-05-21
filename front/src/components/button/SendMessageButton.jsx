import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export const SendMessageButton = ({
    onClick
}) => {
    return <Button onClick={onClick} variant='contained' endIcon={<SendIcon />}>Send</Button>;
};

SendMessageButton.propTypes = {
    onClick: PropTypes.string
};