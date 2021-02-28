import React, { useState, useEffect, useCallback, useRef } from 'react';
import useStyles from './conversationStyle';
import SideDrawer from './Drawer';
import ConversationHeader from './ConversationHeader';
import InputIcon from '@material-ui/icons/Input';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ListIcon from '@material-ui/icons/List';
import MovieIcon from '@material-ui/icons/Movie';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BrushIcon from '@material-ui/icons/Brush';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import SaveIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';

import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useZoomPanHelper
} from 'react-flow-renderer';
import InputNode from '../conversationFlow/InputNode';
import {
  createEdge,
  createInputNode,
  createOutputNode,
  initialElements,
} from '../conversationFlow/conversation-utils';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const graphStyles = {
  width: '100%',
  height: '100vh',
  background: 'rgb(26, 25, 43)',
};
const getNodeId = () => `randomnode_${+new Date()}`;
const onNodeDragStop = (event, node) => console.log('drag stop', node);
const onElementClick = (event, element) => console.log('click', element);
const initBgColor = 'white';
const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [30, 20];
const nodeTypes = {
  selectorInputNode: InputNode,
};

const CustomNodeFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [leftDrawerWidth, setLeftDrawerWidth] = useState(0);
  const [rightDrawerWidth, setRightDrawerWidth] = useState(0);
  const classes = useStyles({ left: leftDrawerWidth, right: rightDrawerWidth });
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [conversationBuilderSize, setConversationBuilderSize] = useState(10);
  const [leftDrawerSize, setLeftDrawerSize] = useState(1);
  const [rightDrawerSize, setRightDrawerSize] = useState(1);
  // const { transform } = useZoomPanHelper();

  useEffect(() => {
    setElements(initialElements);
  }, []);
  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);
  const onElementsRemove = useCallback(
    (elementsToRemove) =>
      setElements((els) => removeElements(elementsToRemove, els)),
    []
  );
  const onAdd = useCallback(
    (node) => {
      console.log(node);
      const position = {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      };
      let id = getNodeId();
      let newNode;
      console.log(position);
      if (node === 'input') newNode = createInputNode(id, position);
      if (node === 'output') newNode = createOutputNode(id, position, 'Right');
      setElements((els) => els.concat(newNode));
    },
    [setElements]
  );

  const onConnect = useCallback(
    (params) =>
      setElements((els) =>
        addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, els)
      ),
    []
  );
  const onLoad = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log('flow loaded:', rfi);
      }
    },
    [reactflowInstance]
  );

  const onDragOver = (event) => {
    console.log(event)
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactflowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    let newNode;
    if (type === 'input') newNode = createInputNode(getNodeId(), position);
    if (type === 'output') newNode = createOutputNode(getNodeId(), position);
    if (type === 'default')
      newNode = {
        id: getNodeId(),
        type,
        position,
        data: { label: `${type} node` },
      };
    setElements((es) => es.concat(newNode));
  };
  // const onSave = useCallback(() => {
  //   if (reactflowInstance) {
  //     const flow = reactflowInstance.toObject();
  //     //setItem on Server
  //     localforage.setItem('flowKey', flow);
  //   }
  // }, [reactflowInstance]);
  // const onRestore = useCallback(() => {
  //   const restoreFlow = async () => {
  //     //restore from redux maybe?
  //     const flow = await localforage.getItem('flowKey');
  //     if (flow) {
  //       const [x = 0, y = 0] = flow.position;
  //       setElements(flow.elements || []);
  //       transform({ x, y, zoom: flow.zoom || 0 });
  //     }
  //   };
  //   restoreFlow();
  // }, [setElements, transform]);

  const leftButtons = [
    { name: 'input', title: 'Input Node', handler: onAdd, icon: <InputIcon />,isDraggable:true },
    {
      name: 'output',
      title: 'Output Node',
      handler: onAdd,
      icon: <InputIcon />,
      isDraggable:true 
    },
    {
      name: 'save',
      title: 'Save Layout',
      handler: ()=>{console.log('should be onSave')},
      icon: <SaveIcon />,
      isDraggable:false 
    },
    {
      name: 'restore',
      title: 'Restore',
      handler: ()=>{console.log('should be onRestore')},
      icon: <RestoreIcon />,
      isDraggable:false 
    },
  ];
  const actions = [
    {
      name: 'calendar',
      title: 'Calendar',
      handler: () => {
        console.log('handler');
      },
      icon: <CalendarTodayIcon />,
    },
    {
      name: 'laser',
      title: 'Laser Pointer',
      handler: () => {
        console.log('handler');
      },
      icon: <BrushIcon />,
    },
    {
      name: 'equipment',
      title: 'Equipment List',
      handler: () => {
        console.log('handler');
      },
      icon: <ListIcon />,
    },
    {
      name: 'video',
      title: 'Video Library',
      handler: () => {
        console.log('handler');
      },
      icon: <MovieIcon />,
    },
    {
      name: 'locations',
      title: 'Location of Positions',
      handler: () => {
        console.log('handler');
      },
      icon: <LocationOnIcon />,
    },
  ];
  const rightButtons = [
    {
      name: 'intents',
      title: 'Intents',
      handler: () => {
        console.log('intent');
      },
      icon: <AccountCircleIcon />,
    },
    {
      name: 'entities',
      title: 'Entities',
      handler: () => {
        console.log('entities');
      },
      icon: <PeopleIcon />,
    },
  ];
  const handleDrawerOpen = (side) => {
    if (side === 'left') {
      setOpenLeft(true);
      setLeftDrawerWidth(240);
      setLeftDrawerSize(2);
    } else {
      setOpenRight(true);
      setRightDrawerWidth(240);
      setRightDrawerSize(2);
    }
    setConversationBuilderSize((prevState) => prevState - 1);
  };

  const handleDrawerClose = (side) => {
    if (side === 'left') {
      setOpenLeft(false);
      setLeftDrawerWidth(0);
      setLeftDrawerSize(1);
    } else {
      setOpenRight(false);
      setRightDrawerWidth(0);
      setRightDrawerSize(1);
    }
    setConversationBuilderSize((prevState) => prevState + 1);
  };

  return (
    <div className={classes.root}>
      <ConversationHeader
        classes={classes}
        openLeft={openLeft}
        openRight={openRight}
        handleLeftDrawerOpen={() => handleDrawerOpen('left')}
        handleRightDrawerOpen={() => handleDrawerOpen('right')}
      />
      <Grid container spacing={3}>
        <Grid xs={leftDrawerSize}>
          <SideDrawer
            open={openLeft}
            drawerOpen={classes.drawerLeftOpen}
            drawerClose={classes.drawerLeftClose}
            handleDrawerClose={() => handleDrawerClose('left')}
            handleDrawerOpen={() => handleDrawerOpen('left')}
            buttons={leftButtons}
            actions={actions}
            classes={classes}
            side='left'
          />
        </Grid>
        <Grid item xs={conversationBuilderSize}>
          <main className={classes.content} ref={reactFlowWrapper}>
            <Paper className={classes.conversation}></Paper>
            <ReactFlow
              elements={elements}
              onElementClick={onElementClick}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              onNodeDragStop={onNodeDragStop}
              style={{ background: bgColor }}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              connectionLineStyle={connectionLineStyle}
              snapToGrid={true}
              snapGrid={snapGrid}
              // defaultZoom={1.5}
              style={graphStyles}
            >
              <Controls />
              <Background color='#aaa' gap={16} />
              <MiniMap
                nodeStrokeColor={(n) => {
                  if (n.type === 'input') return '#0041d0';
                  if (n.type === 'selectorNode') return bgColor;
                  if (n.type === 'output') return '#ff0072';
                }}
                nodeColor={(n) => {
                  if (n.type === 'selectorNode') return bgColor;
                  return '#fff';
                }}
              />
            </ReactFlow>
          </main>
        </Grid>
        <Grid xs={rightDrawerSize}>
          <SideDrawer
            open={openRight}
            drawerOpen={classes.drawerRightOpen}
            drawerClose={classes.drawerRightClose}
            handleDrawerClose={() => handleDrawerClose('right')}
            handleDrawerOpen={() => handleDrawerOpen('right')}
            buttons={rightButtons}
            actions={[]}
            classes={classes}
            side='right'
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default CustomNodeFlow;
