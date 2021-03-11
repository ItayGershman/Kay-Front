import React, { useState, useEffect, useCallback, useRef } from 'react';
import useStyles from './conversationStyle';
import SideDrawer from './Drawer';
import ConversationHeader from './ConversationHeader';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ListIcon from '@material-ui/icons/List';
import MovieIcon from '@material-ui/icons/Movie';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BrushIcon from '@material-ui/icons/Brush';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import SaveIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';
import WidgetsIcon from '@material-ui/icons/Widgets';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';

import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  useZoomPanHelper,
  isNode,
} from 'react-flow-renderer';
import InputNode from './InputNode';
import OutputNode from './OutputNode';
import {
  createEdge,
  createInputNode,
  createOutputNode,
  initialElements,
  getLayoutElements,
} from './conversation-utils';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  graphStyles,
  handleNodeStrokeColor,
  onNodeDragStop,
  onElementClick,
  initBgColor,
  connectionLineStyle,
  snapGrid,
  nodeTypes,
  handleOnDrop,
  handleOnAdd,
} from './conversation-utils';

const CustomNodeFlow = () => {
  const [mainElementsSize, setMainElementsSize] = useState({
    leftDrawer: 1,
    rightDrawer: 1,
    conversationBuilder: 10,
    openLeft: false,
    openRight: false,
    leftDrawerWidth: 0,
    rightDrawerWidth: 0,
  });
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef(null);
  const classes = useStyles({
    left: mainElementsSize.leftDrawerWidth,
    right: mainElementsSize.rightDrawerWidth,
  });
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
      const newNode = handleOnAdd(node);
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
        rfi.fitView();
        console.log('flow loaded:', rfi);
      }
    },
    [reactflowInstance]
  );
  const onLayout = useCallback(
    (direction) => {
      const layoutElements = getLayoutElements(elements, direction, isNode);
      setElements(layoutElements);
    },
    [elements]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };
  const onDrop = (event) => {
    event.preventDefault();
    reactflowInstance.fitView();
    const newNode = handleOnDrop(
      event,
      reactflowInstance,
      reactFlowWrapper,
      elements
    );
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
    {
      name: 'input',
      title: 'Input Node',
      handler: () => {
        console.log('onAdd');
      },
      icon: <WidgetsIcon />,
      isDraggable: true,
    },
    {
      name: 'output',
      title: 'Output Node',
      handler: () => {
        console.log('onAdd');
      },
      icon: <WidgetsIcon />,
      isDraggable: true,
    },
    {
      name: 'save',
      title: 'Save Layout',
      handler: () => {
        console.log('onSave');
      },
      icon: <SaveIcon />,
      isDraggable: false,
    },
    {
      name: 'restore',
      title: 'Restore',
      handler: () => {
        console.log('should be onRestore');
      },
      icon: <RestoreIcon />,
      isDraggable: false,
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
  const utils = [
    {
      name: 'vertical layout',
      title: 'Vertical Layout',
      handler: onLayout,
      icon: <SwapVerticalCircleIcon />,
      isDraggable: false,
    },
    {
      name: 'horizontal layout',
      title: 'Horizontal Layout',
      handler: onLayout,
      icon: <SwapHorizontalCircleIcon />,
      isDraggable: false,
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
  const onDrawerOpen = (side) => {
    console.log(side);
    if (side === 'left') {
      setMainElementsSize((prevState) => {
        console.log(prevState.conversationBuilder);
        if (prevState.leftDrawer === 2) return prevState;
        else return {
          ...prevState,
          openLeft: true,
          leftDrawerWidth: 240,
          leftDrawer: 2,
          conversationBuilder: prevState.conversationBuilder - 1,
        };
      });
    } else {
      setMainElementsSize((prevState) => {
        console.log(prevState);
        if (prevState.rightDrawer === 2) return prevState;
        else return {
          ...prevState,
          openRight: true,
          rightDrawerWidth: 240,
          rightDrawer: 2,
          conversationBuilder: prevState.conversationBuilder - 1,
        };
      });
    }
    // setMainElementsSize((prevState) => ({
    //   ...prevState,
    //   conversationBuilder: prevState.conversationBuilder - 1,
    // }));
  };

  const onDrawerClose = (side) => {
    if (side === 'left') {
      setMainElementsSize((prevState) => ({
        ...prevState,
        openLeft: false,
        leftDrawerWidth: 0,
        leftDrawer: 1,
        // conversationBuilder: prevState.conversationBuilder + 1,
      }));
    } else {
      setMainElementsSize((prevState) => ({
        ...prevState,
        openRight: false,
        rightDrawerWidth: 0,
        rightDrawer: 1,
        // conversationBuilder: prevState.conversationBuilder + 1,
      }));
    }
    setMainElementsSize((prevState) => ({
      ...prevState,
      conversationBuilder: prevState.conversationBuilder + 1,
    }));
  };
  return (
    <div className={classes.root}>
      <ConversationHeader
        classes={classes}
        openLeft={mainElementsSize.openLeft}
        openRight={mainElementsSize.openRight}
        handleLeftDrawerOpen={() => onDrawerOpen('left')}
        handleRightDrawerOpen={() => onDrawerOpen('right')}
      />
      <Grid container spacing={3}>
        <Grid xs={mainElementsSize.leftDrawer}>
          <SideDrawer
            open={mainElementsSize.openLeft}
            drawerOpen={classes.drawerLeftOpen}
            drawerClose={classes.drawerLeftClose}
            handleDrawerClose={() => onDrawerClose('left')}
            onDrawerOpen={() => onDrawerOpen('left')}
            buttons={leftButtons}
            actions={actions}
            classes={classes}
            utils={utils}
            side='left'
          />
        </Grid>
        <Grid item xs={mainElementsSize.conversationBuilder}>
          <main
            className={`${classes.content} reactflow-wrapper`}
            ref={reactFlowWrapper}
          >
            <Paper className={classes.conversation}></Paper>
            <ReactFlow
              elements={elements}
              onElementClick={(event, element) => {
                onElementClick(event, element, setSelectedNode);
                onDrawerOpen('right');
              }}
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
              defaultZoom={0}
              style={graphStyles}
            >
              <Controls />
              <MiniMap
                nodeStrokeColor={(n) => handleNodeStrokeColor(n)}
                nodeColor={(n) =>
                  n.type === 'selectorInputNode' ? bgColor : '#fff'
                }
                nodeBorderRadius={2}
              />
              <Background color='#aaa' gap={16} />
            </ReactFlow>
          </main>
        </Grid>
        <Grid xs={mainElementsSize.rightDrawer}>
          <SideDrawer
            open={mainElementsSize.openRight}
            drawerOpen={classes.drawerRightOpen}
            drawerClose={classes.drawerRightClose}
            handleDrawerClose={() => onDrawerClose('right')}
            handleDrawerOpen={() => onDrawerOpen('right')}
            buttons={rightButtons}
            classes={classes}
            defaultZoom={1}
            node={selectedNode}
            elements={elements}
            setElements={setElements}
            side='right'
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default CustomNodeFlow;
