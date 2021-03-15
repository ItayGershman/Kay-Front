import React, { useState, useEffect } from 'react';
import ScenarioCard from './ScenarioCard';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ScenarioDialog from './ScenarioDialog';
import { useDispatch, useSelector } from 'react-redux';
import { getAllScenarios } from '../../redux/actions/conversationActions';

const welcomingImage =
  'https://image.shutterstock.com/image-vector/welcome-sign-colour-confetti-vector-260nw-313934588.jpg';
const equipmentImage =
  'https://i.pinimg.com/originals/7f/15/e3/7f15e30f94d19e616f0f009a29a89ec8.jpg';
const positionTrainingImage =
  'https://www.fodcontrol.com/wp-content/uploads/2013/09/trainingcomputers.jpg';
const scheduleImage =
  'https://image.shutterstock.com/image-vector/people-planning-concept-entrepreneurship-calendar-260nw-1523635688.jpg';
const presentationImage =
  'https://www.galchimia.com/wp-content/uploads/2018/03/how-to-crash-your-own-presentation-1024x787.jpg';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [displayScenarios, setDisplayScenarios] = useState([]);
  const scenarioSelector = useSelector((state) => state.scenario);
  const { scenarios, loading, error } = scenarioSelector;
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClickClose = () => {
    setOpenDialog(false);
  };
  const handleClickedCard = (name) => {
    // dispatch(getScenario(name));
  };

  useEffect(() => {
    dispatch(getAllScenarios());
  }, []);
  useEffect(() => {
    setDisplayScenarios(scenarioSelector.scenarios ? scenarios : []);
  }, [scenarioSelector]);

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={{ margin: '30px 0px 0px 100px' }}>
          <Typography variant='h4'>Scenarios</Typography>
        </div>
        <div style={{ margin: '30px 100px 0px 0px' }}>
          <Button
            variant='contained'
            color='primary'
            endIcon={<PlaylistAddIcon />}
            onClick={handleClickOpen}
          >
            Add Scenario
          </Button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            margin: '50px',
          }}
        >
          {displayScenarios.length > 0 &&
            displayScenarios.map((scenario) => {
              return (
                <div
                  style={{ margin: '20px' }}
                  onClick={() => handleClickedCard(scenario.title)}
                >
                  <ScenarioCard
                    title={scenario.scenarioName}
                    image={scenario.scenarioImage}
                    description={scenario.scenarioDescription}
                  />
                </div>
              );
            })}
        </div>
      )}

      <ScenarioDialog
        openDialog={openDialog}
        handleClickClose={handleClickClose}
        setScenarios={setDisplayScenarios}
      />
    </div>
  );
};
export default Dashboard;
