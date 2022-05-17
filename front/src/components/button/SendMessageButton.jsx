import React from 'react';
import PropTypes from 'prop-types';

export const SendMessageButton = ({
    onClick
}) => {
    return <button onClick={onClick}>&#9658;</button>;
};

SendMessageButton.propTypes = {
    onClick: PropTypes.string
};