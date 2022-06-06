import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Copyright } from '../components/footer/Copyright';

const theme = createTheme();

const signInButton = {
  width: '300px',
  maxWidth: '100%',
  height: 'auto',
  backgroundSize: 'cover',
};

export const SnsSignIn = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log({ token: token, user: user });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const twitterSignIn = () => {
    alert('実装中');
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            サインインして利用開始する
          </Typography>
          <Button type='submit' variant='text' sx={{ mt: 3, mb: 0.1 }} onClick={googleSignIn}>
            <img src='btn_google_signin_light_normal_web@2x.png' alt='Sign in with Google' style={signInButton} />
          </Button>
          <Button type='submit' variant='text' sx={{ mt: 0.1, mb: 2 }} onClick={twitterSignIn}>
            <img src='sign-in-with-twitter-gray.png' alt='Sign in with Twitter' style={signInButton} />
          </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
