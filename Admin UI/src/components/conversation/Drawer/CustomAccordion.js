import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TrainIntents from '../TrainIntents';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  accordionSummary: {
    display: 'flex',
    alignItems: 'center',
  },
  trainKay: {
    marginLeft:"30px"
  }
}));

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const CustomizedAccordion = ({isDrawerOpen,setDrawer}) => {
  const [expanded, setExpanded] = useState('');
  const classes = useStyles();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        onClick={setDrawer}
      >
        <AccordionSummary
          aria-controls='panel1d-content'
          id='panel1d-header'
          expandIcon={isDrawerOpen && <ExpandMoreIcon />}
        >
          <div
            className={classes.accordionSummary}
          >
            <AccountCircleIcon color="action"  />
            {isDrawerOpen && (
              <Typography className={classes.trainKay}>Train Kay</Typography>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <TrainIntents />
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomizedAccordion;
