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
  CustomCreatableDropdown,
} from './Drawer-utils';
import CustomizedAccordion from './CustomAccordion';
import { notify } from '../../generalUtils';

const RightDrawer = ({ node, setElements, drawerState, title }) => {
  const [intent, setIntent] = useState(null);
  const [entities, setEntities] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { allIntents } = useSelector((state) => state.intent);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
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
    if (data.action) {
      //check if data.action.value is needed
      data['action'] = data.action;
    } else data['action'] = null;
    const keys = Object.keys(data);
    let newNode = {
      name: title,
      intent: '',
      entities: [],
      speak: [],
      action: {},
    };
    keys.forEach((key) => (newNode[key] = data[key]));
    newNode.name = title;
    let newIntent = data['intent'].value;

    if (newIntent.includes('wit_'))
      newNode['intent'] = newIntent.replace('wit_', '');
    else newNode['intent'] = newIntent;

    newNode.entities = newNode.entities.map((entity) => {
      return { entity: entity.value };
    });

    if (newNode['intent'] === '')
      newNode['intent'] = intent.value.replace('wit_', '');
    const isExist = allIntents.some(
      (intent) => intent.name === `wit_${newNode.intent}`
    );
    console.log("newNode:",newNode)
    // if (newNode['action'] && data.action === 'Laser') {
    //   newNode['action'] = data['laser'];
    // }
    if (node.data === undefined) {
      //need to send action also
      dispatch(createIntent(newNode, isExist));
      notify('New intent created', 'success');
    } else dispatch(updateIntent(newNode, isExist));
    setElements((prevState) => {
      const elem = prevState.find((el) => el.id === node.id);
      elem.data = { ...elem.data, ...newNode };
      return [...prevState];
    });
    notify('Submitted!', 'info');
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
    const witEntities = await getWitEntities();
    setEntities(witEntities);
  }, []);

  return (
    <div>
      {drawerState && node && (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.container}>
          <div className={classes.input}>
            <div>
              <h2 style={{ wordBreak: 'break-word', width: 200 }}>
                Scenario Name: {title}
              </h2>
            </div>
          </div>
          <div className={classes.input}>
            <CustomCreatableDropdown
              control={control}
              name={'intent'}
              label={'Intent Name'}
              rules={{ required: true }}
              setValue={setValue}
              options={allIntents}
              isMulti={false}
              zIndex={9999}
              type={'intent'}
              defaultValue={setInitialValues(node).intent}

            />
            {errors.intent && (
              <p style={{ color: 'red' }}>Intent is required</p>
            )}
          </div>
          <div className={classes.input}>
            <div style={{ marginBottom: 10 }}>
              <CustomCreatableDropdown
                control={control}
                name={'entities'}
                label={'Entity Name'}
                rules={{ required: true }}
                setValue={setValue}
                options={entities}
                isMulti={true}
                zIndex={9998}
                type={'entities'}
                defaultValue={setInitialValues(node).entities}
              />
            </div>
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
                    alignItems:'center',
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
              setValue={setValue}
              label={'Choose Action'}
              defaultValue={setInitialValues(node).action}
              node={node}
              options={[
                { value: null, label: '' },
                { value: 'laser', label: 'Laser' },
                { value: 'video', label: 'Video' },
                { value: 'calendar', label: 'Calendar' },
                { value: 'equipment', label: 'Equipment' },
              ]}
            />
          </div>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            style={{ marginTop: 20, marginBottom: 100 }}
          >
            Submit
          </Button>
        </form>
      )}
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
