import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export default function ImageAvatars({ displayName, photoURL }) {
  return (
    <Stack direction='row' spacing={2}>
      <Avatar alt={displayName} src={photoURL} sx={{ marginTop: 20, width: 200, height: 200 }} />
    </Stack>
  );
}

ImageAvatars.propTypes = {
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};
