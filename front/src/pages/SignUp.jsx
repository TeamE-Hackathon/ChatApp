import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link as RouterLink, Navigate, useNavigate } from 'react-router-dom';
import { Copyright } from '../components/footer/Copyright';

const theme = createTheme();

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [agree, setAgree] = useState(false);
  const onChangeEmail = (event) => setEmail(event.target.value);
  const onChangePassword = (event) => setPassword(event.target.value);
  const onChangeUserFirstName = (event) => setUserFirstName(event.target.value);
  const onChangeUserLastName = (event) => setUserLastName(event.target.value);
  const onChangeAgree = (event) => setAgree(event.target.checked);
  const [user, setUser] = useState('');
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();

  const createDynamodbUser = (uid, name, signInType) => {
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
      navigate('/');
    });
  };

  const updateAdditionalProfile = () => {
    const additionalProfile = {
      displayName: `${userFirstName} ${userLastName}`,
      photoURL: 'https://example.com/jane-q-user/profile.jpg',
    };
    updateProfile(auth.currentUser, additionalProfile)
      .then(() => {
        // Profile updated!
        const user = auth.currentUser;
        console.log({ updatedUser: user });

        createDynamodbUser(user.uid, additionalProfile.displayName, 'email');
      })
      .catch((error) => {
        console.log({ error: error });
      });
  };

  const createAccount = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log({ user: user });
        updateAdditionalProfile();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode: errorCode, errorMessage: errorMessage });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      email: email,
      password: password,
    });
    createAccount(email, password);
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
                    Sign up
                  </Typography>
                  <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete='given-name'
                          name='firstName'
                          required
                          fullWidth
                          id='firstName'
                          label='First Name'
                          autoFocus
                          onChange={onChangeUserFirstName}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id='lastName'
                          label='Last Name'
                          name='lastName'
                          autoComplete='family-name'
                          onChange={onChangeUserLastName}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          id='email'
                          label='Email Address'
                          name='email'
                          autoComplete='email'
                          onChange={onChangeEmail}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name='password'
                          label='Password (8????????????)'
                          type='password'
                          id='password'
                          autoComplete='new-password'
                          onChange={onChangePassword}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Checkbox value='allowExtraEmails' color='primary' onChange={onChangeAgree} />}
                          label='??????????????????????????????'
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      sx={{ mt: 3, mb: 2 }}
                      disabled={
                        !(email !== '' && password.length > 7 && userFirstName !== '' && userLastName !== '' && agree)
                      }
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent='flex-end'>
                      <Grid item>
                        <Link component={RouterLink} to='/signin' variant='body2'>
                          ???????????????????????????????????????????????????
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>
          )}
        </>
      )}
    </>
  );
};
