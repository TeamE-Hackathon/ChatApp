import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';

export default function ImageAvatars() {
  const [user, setUser] = useState('');
  console.log('user', user);

  let displayName;
  if (user) {
    displayName = user.displayName;
  }

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

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
