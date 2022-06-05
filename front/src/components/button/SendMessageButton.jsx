import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export const SendMessageButton = ({ onClick }) => {
  return <Button onClick={onClick} variant='contained' endIcon={<SendIcon />}></Button>;
};

SendMessageButton.propTypes = {
  onClick: PropTypes.func,
};
