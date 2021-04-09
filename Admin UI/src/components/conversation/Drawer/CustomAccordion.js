import React,{useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TrainIntents from '../TrainIntents';

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

const CustomizedAccordion = ({isDrawerOpen}) => {
  const [expanded, setExpanded] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          aria-controls='panel1d-content'
          id='panel1d-header'
          expandIcon={isDrawerOpen && <ExpandMoreIcon />}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AccountCircleIcon style={{color:'#757575'}}  />
            {isDrawerOpen && (
              <Typography style={{ marginLeft: '30px' }}>Intents</Typography>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <TrainIntents />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CustomizedAccordion;
