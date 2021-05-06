import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    bottom: 0,
    width: '70%',
    margin: '50px auto',
    background: 'blue',
    borderRadius: '50px',
    padding: '20px',
    backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/000/097/736/small/abstract-robot-background-vector.jpg')`,
    opacity: '0.9',
  },
  bubbleContainer: {
    width: '100%',
    display: 'flex',
  },
  leftBubble: {
    borderRadius: '0px 30px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
    backgroundColor: '#5c6bc0',
    color: 'white',
  },
  rightBubble: {
    borderRadius: '30px 0px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
    backgroundColor: '#eeeeee',
    color: 'black',
  },
  right: {
    justifyContent: 'flex-end ',
  },
  left: {
    justifyContent: 'flex-start ',
  },
  userColor: {
    color: '#283593',
  },
  kayColor: {
    color: 'black',
  },
  chat: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0.65',
  },
  chatHeader: {
    padding: '0px 10px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid lightgray',
  },
  chatHeaderInfo: {
    flex: 1,
    paddingLeft: '20px',
    '& > h3': {
      marginBottom: '3px',
      fontWeight: 500,
    },
    '& > p': {
      color: 'gray',
    },
  },
  chatBody: {
    flex: 1,
    backgroundImage:
      'url(https://images.assetsdelivery.com/compings_v2/istry/istry1503/istry150300003.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    padding: '30px',
    overflow: 'scroll',
  },
  chatMessage: {
    position: 'relative',
    fontSize: '16px',
    padding: '10px',
    width: 'fit-content',
    borderRadius: '10px',
    backgroundColor: 'lightskyblue',
    marginBottom: '30px',
    maxWidth: '45vw',
  },
  chatTimestamp: {
    marginLeft: '10px',
    fontSize: 'xx-small',
  },
  chatName: {
    position: 'absolute',
    top: '-15px',
    fontWeight: 800,
    fontSize: 'xx-small',
  },
  chatReceiver: {
    marginLeft: 'auto',
    backgroundColor: '#ffffff',
  },
  chatFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '62px',
    borderTop: '1px solid lightgray',
    '& > form': {
      flex: 1,
      display: 'flex',
    },
    '& > form > input': {
      flex: 1,
      borderRadius: '30px',
      outlineWidth: 0,
      padding: '10px',
      border: 'none',
    },
    '& > form > button': {
      display: 'none',
    },
    '& > .MuiSvgIcon-root': {
      padding: '10px',
      color: 'gray',
    },
  },
  sidebarChat: {
    display: 'flex',
    padding: '5px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #f6f6f6',
    '&:hover': {
      backgroundColor: '#ebebeb',
    },
  },
  sidebarChatInfo: {
    marginLeft: '15px',
    marginBottom: '8px',
    '& > h2': {
      fontSize: '16px',
      marginBottom: '8px',
    }
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    flex: '0.35',
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    borderRight: '1px solid lightgray',
  },
  sidebarHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: '10vw',
    '& > MuiSvgIcon-root': {
      marginRight: '2vw',
      fontSize: '24px !important',
    },
  },
  sidebarSearch: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    height: '39px',
    padding: '10px',
    marginTop: '10px',
  },
  sidebarSearchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: '35px',
    borderRadius: '20px',
    '& > MuiSvgIcon-root': {
      color: 'gray',
      padding: '10px',
    },
    '& > input': {
      border: 'none',
      outlineWidth: 0,
      marginLeft: '10px',
    },
  },
  sidebarChats: {
    flex: 1,
    backgroundColor: 'white',
    overflow: 'scroll',
  },
  trashIcon: {
    right: 15,
    top: 15,
    position: 'absolute',
    padding: 2,
    color:'#ef5350',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#ef5350',
      color: 'white',
    },
  },
}));

export default useStyles;
