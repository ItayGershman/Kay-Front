import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
  createIntent,
  updateIntent,
} from '../../../redux/actions/intentActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  useStyles,
  AppendButton,
  RemoveButton,
  ControlledTextFields,
  IntentField,
  SpeakTextField,
  setInitialValues,
  getWitEntities,
  ActionField,
} from './Drawer-utils';
import CustomizedAccordion from './CustomAccordion';

const RightDrawer = ({
  node,
  setElements,
  drawerState,
  title,
  handleDrawerOpen,
}) => {
  const [intent, setIntent] = useState(null);
  const [entities, setEntities] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { allIntents } = useSelector((state) => state.intent);

  const notify = () =>
    toast.info('🦄 Submitted!', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: setInitialValues(node),
  });
  const {
    fields: entitiesFields,
    append: entitiesAppend,
    remove: entitiesRemove,
  } = useFieldArray({ control, name: 'entities' });
  const {
    fields: speakFields,
    append: speakAppend,
    remove: speakRemove,
  } = useFieldArray({ control, name: 'speak' });

  const onSubmit = (data) => {
    //set new node
    const keys = Object.keys(data);
    let newNode = { name: title, intent: '', entities: [], speak: [] };
    keys.forEach((key) => (newNode[key] = data[key]));
    newNode.name = title;
    if (newNode['intent'] === '') newNode['intent'] = intent;
    const isExist = allIntents.some(
      (intent) => intent.name === `wit_${newNode.intent}`
    );
    if (node.data === undefined) {
      dispatch(createIntent(newNode, isExist));
    } else dispatch(updateIntent(newNode));
    setElements((prevState) => {
      const elem = prevState.find((el) => el.id === node.id);
      elem.data = { ...elem.data, ...newNode };
      return [...prevState];
    });
    notify('Submitted');
  };

  useEffect(() => {
    //Clear old form
    speakRemove([...Array(speakFields.length).keys()]);
    entitiesRemove([...Array(entitiesFields.length).keys()]);
    //Set new form
    const { entities, speak, intent } = setInitialValues(node);
    setIntent(intent);
    speak.forEach((text) => speakAppend({ speak: text }));
    entities.forEach((entity) => entitiesAppend({ entity: entity }));
  }, [node]);
  useEffect(async () => {
    setEntities(getWitEntities());
  }, []);

  return (
    <div>
      {drawerState && node && (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
          <div className={classes.input}>
            <ControlledTextFields
              control={control}
              name={'name'}
              label={'Scenario Name'}
              defaultValue={title}
              isDisabled
            />
          </div>
          <div className={classes.input}>
            <IntentField
              control={control}
              name={'intent'}
              label={'Intent Name'}
              defaultValue={setInitialValues(node).intent}
              setIntent={setIntent}
              intent={intent}
            />
          </div>
          <div className={classes.input}>
            {entitiesFields.map((item, index) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <ControlledTextFields
                    control={control}
                    name={`entities[${index}].entity`}
                    label={'Entity'}
                    defaultValue={setInitialValues(node).entities[index]}
                    isDisabled={false}
                    isMultiline={true}
                  />
                  <RemoveButton
                    handler={entitiesRemove}
                    index={index}
                    classes={classes}
                  />
                </div>
              );
            })}
            <AppendButton
              handler={entitiesAppend}
              title={'Add Entity'}
              classes={classes}
            />
          </div>
          <div className={classes.input}>
            {speakFields.map((item, index) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}
                >
                  <SpeakTextField
                    control={control}
                    name={`speak[${index}].speak`}
                    label={'Speak'}
                    defaultValue={setInitialValues(node).speak[index]}
                    isDisabled={false}
                    isMultiline
                    index={index}
                    setValue={setValue}
                    entitiesOptions={entities}
                  />
                  <RemoveButton
                    handler={speakRemove}
                    index={index}
                    classes={classes}
                  />
                </div>
              );
            })}
            <AppendButton
              handler={speakAppend}
              title={'Add Speak'}
              classes={classes}
            />
          </div>
          <div className={classes.input}>
            <label>Choose Action</label>
            <ActionField
              control={control}
              name={'action'}
              label={'Choose Action'}
              options={[
                { value: 'laser', label: 'Laser' },
                { value: 'video', label: 'Video' },
                { value: 'calendar', label: 'Calendar' },
              ]}
            />
          </div>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            style={{ marginTop: 20 }}
          >
            Submit
          </Button>
        </form>
      )}
      {console.log(drawerState)}
      <CustomizedAccordion
        isDrawerOpen={drawerState}
        setDrawer={handleDrawerOpen}
      />
      <ToastContainer
        position='bottom-left'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RightDrawer;
