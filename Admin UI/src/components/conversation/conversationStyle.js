import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  buttons: {
    zIndex: 2,
  },
  sidebar: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    backgroundColor: '#ffffff',
    border: '1px solid grey',
  },
  arrowLeft: {
    position: 'relative',
    bottom: '15px',
    right: '15px',
  },
  arrowRight: {
    position: 'relative',
    bottom: '15px',
    left: '15px',
  },
  menuControl: {
    alignItems: 'baseline',
    display: 'flex',
  },
  arrows: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  toolBarControl: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  root: {
    display: 'flex',
    position: 'relative',
    padding:'20px'
  },
  appBar: {
    position: 'absolute',
    
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarLeftShift: {
    marginLeft: (props) => props.left,
    width: (props) => `calc(100% - ${props.left}px - ${props.right}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarRightShift: {
    marginRight: (props) => props.right,
    width: (props) => {
      console.log(props);
      return `calc(100% - ${props.right}px - ${props.left}px)`;
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonLeft: {
    marginRight: 36,
  },
  menuButtonRight: {
    marginLeft: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    position: 'absolute',
  },
  drawerLeftOpen: {
    top: 58,
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerLeftClose: {
    top: 58,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  drawerRightOpen: {
    right: 0,
    left: 'auto',
    top: 58,
    width: 240,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerRightClose: {
    right: 0,
    left: 'auto',
    top: 58,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbarLeft: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbarRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    marginTop: '5%',
    flexGrow: 1,
    padding: theme.spacing(5),
  },
}));

export default useStyles;
