import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export const SendMessageButton = ({ onClick }) => {
  return <>
    <Button
      sx={{ bgcolor:'white', width: '55px', height: '55px', border: 1, borderColor: '#1976d2', borderRadius: '10%', marginLeft: '20px' }}
      onClick={onClick}
      variant='outlined'
      // endIcon={<SendIcon color='primary' fontSize='large' sx={{ marginRight: '5px' }} />}>
    >
      <SendIcon color='primary' sx={{fontSize:'35px', marginLeft:'5px'}} />
    </Button>
  </>;
};

SendMessageButton.propTypes = {
  onClick: PropTypes.func,
};
