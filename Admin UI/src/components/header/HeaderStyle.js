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
    backgroundColor:'	#F8F8F8',
    color:'#3f51b5'
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
    color: '#3f51b5',
    textDecoration: 'none',
    marginLeft: '30px',
    fontWeight:'bold'
  }
}));
export default useStyles;