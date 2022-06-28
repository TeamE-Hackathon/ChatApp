import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { getAuth } from 'firebase/auth';
import PropTypes from 'prop-types';

export default function ImageAvatars({ displayName }) {
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <Stack direction='row' spacing={2}>
      <Avatar alt={displayName} src={user.photoURL} sx={{ marginTop: 20, width: 200, height: 200 }} />
    </Stack>
  );
}

ImageAvatars.propTypes = {
  displayName: PropTypes.string,
};
