import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React from 'react';

export function GoogleSigninButton() {

  return (
    <Stack spacing={2} direction='row' sx={{display: 'flex'}}>
      <Button variant='contained' sx={{ backgroundColor: '#4285F4', height: '71px', width: '300px' }}>
        <img src='/btn_google_light_normal_ios.svg'
          alt='GoogleLogoImg'
          style={{ maxWidth: '76px', maxHeight: '76px', marginLeft: '-20px' }}
        />
        <p style={{fontSize: '21px', fontWeight: '900', textTransform: 'capitalize', marginLeft: '10px', marginRight: '-7px'}}>Sign in with Google</p>
      </Button>
    </Stack>
  );
}