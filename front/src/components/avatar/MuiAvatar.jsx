import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';

export default function ImageAvatars({ displayName }) {
  return (
    <Stack direction='row' spacing={2}>
      <Avatar alt={displayName} src='/static/images/avatar/1.jpg' sx={{ marginTop: 20, width: 200, height: 200 }} />
      {/* <div>
        {displayName}
        {user.fadfa}
      </div> */}
    </Stack>
  );
}

ImageAvatars.propTypes = {
  displayName: PropTypes.string,
};
