import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React from 'react';

export function TwitterSigninButton() {
  return (
    <Stack spacing={2} direction='row' sx={{display: 'flex'}}>
      <Button variant='contained' sx={{ backgroundColor: '#1D9BF0', height: '71px', width: '300px' }}>
        <img src='Twitter social icons - square - blue.svg'
          alt='TwitterLogoImg'
          style={{ maxWidth: '67px', maxHeight: '67px', marginLeft: '-20px', borderRadius: '3px' }}
        />
        <p style={{fontSize: '21px', fontWeight: '900', textTransform: 'capitalize', marginLeft: '10px', marginRight: '-2px'}}>Sign in with Twitter</p>
      </Button>
    </Stack>
  );
}