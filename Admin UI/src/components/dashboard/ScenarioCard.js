import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    padding: 10,
    backgroundColor: '#c5cae9',
  },
  media: {
    height: 180,
  },
});

export default function ScenarioCard({ title, image, description, id }) {
  const classes = useStyles();
  const history = useHistory();

  const routeChange = () => {
    let path = `/conversation/${title}`;
    history.push(path);
  };
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title='Contemplative Reptile'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {title}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color='primary' variant='contained' onClick={routeChange}>
          Add Action To This Scenario
        </Button>
      </CardActions>
    </Card>
  );
}
