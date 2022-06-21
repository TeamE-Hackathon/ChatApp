import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
import ImageAvatars from '../components/avatar/MuiAvatar';
// import ActionAreaCard from '../components/card/Card';
import FormDialog from '../components/form/FormDialog';

export const MyPage = () => {
  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item>
        <ImageAvatars />
      </Grid>
      <Grid item xs={12}>
        <FormDialog />
      </Grid>
    </Grid>
  );
};
