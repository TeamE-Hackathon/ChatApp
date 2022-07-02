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
import axios from 'axios';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link as RouterLink, Navigate } from 'react-router-dom';
import { GoogleSigninButton } from '../components/button/GoogleSigninButton';
import { TwitterSigninButton } from '../components/button/TwitterSigninButton';
import { Copyright } from '../components/footer/Copyright';
import { auth } from '../firebase';

const theme = createTheme();

export const SnsSignIn = () => {
  const [user, setUser] = useState('');
  const [loaded, setLoaded] = useState(false);

  const googleProvider = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  const createDynamodbUser = async (uid, name, signInType) => {
    const { data: userInfo } = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}:3001/users/${uid}`); // eslint-disable-line
    // 初めてサインインする場合にDynamoDBにユーザ情報を保存
    if (userInfo.length === 0) {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_ENDPOINT}:3001/users/`, // eslint-disable-line
        data: {
          uid: uid,
          name: name,
          signInType: signInType,
        },
      }).then((res) => {
        console.log('res', res.data);
      });
    }
  };

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log({ token: token, user: user });

        createDynamodbUser(user.uid, user.displayName, 'google');
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

        createDynamodbUser(user.uid, user.displayName, 'twitter');
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
                    <GoogleSigninButton />
                  </Button>
                  <Button type='submit' variant='text' sx={{ mt: 0.1, mb: 2 }} onClick={twitterSignIn}>
                    <TwitterSigninButton />
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
