import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    // flexDirection: 'row',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    // flexDirection: 'row',
    width: '100%',
    marginLeft: '5vw',
    justifyContent: 'space-between',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '30px',
  }
}));
export default useStyles;