import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { Copyright } from '../components/footer/Copyright';
import { auth } from '../firebase';
// import './firebase.js';

const theme = createTheme();

const signInButton = {
  width: '300px',
  maxWidth: '100%',
  height: 'auto',
  backgroundSize: 'cover',
};

export const SnsSignIn = () => {
  const [user, setUser] = useState('');
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  // const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const twitterProvider = new TwitterAuthProvider();

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
    signInWithPopup(auth, twitterProvider)
      .then((result) => {
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.        
        const credential = TwitterAuthProvider.credentialFromResult(result);
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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      {loaded && (
        <>
          {user ? (
            <Navigate to={'/'} />
          ) : (
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
                    <img
                      src='btn_google_signin_light_normal_web@2x.png'
                      alt='Sign in with Google'
                      style={signInButton}
                    />
                  </Button>
                  <Button type='submit' variant='text' sx={{ mt: 0.1, mb: 2 }} onClick={twitterSignIn}>
                    <img src='signin_with_twitter.png' alt='Sign in with Twitter' style={signInButton} />
                  </Button>
                  <Grid container justifyContent='flex-end' sx={{ mt: 3, mb: 1 }}>
                    <Grid item>
                      <Link component={RouterLink} to='/signin' variant='body2'>
                        Emailでサインイン
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Container>
            </ThemeProvider>
          )}
        </>
      )}
    </>
  );
};
