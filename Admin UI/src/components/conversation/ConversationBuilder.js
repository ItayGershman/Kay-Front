import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  updateConfiguration,
  getConfiguration,
} from '../../redux/actions/conversationActions';
import useStyles from './conversationStyle';
import SideDrawer from './Drawer/Drawer';
import TrainDialog from './TrainDialog';
import ConversationHeader from './ConversationHeader';
import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  isNode,
} from 'react-flow-renderer';
import {
  defaultLayout,
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
  handleDrawer,
  getLayoutElements,
} from './conversation-utils';
import { Paper, Grid } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import RestoreIcon from '@material-ui/icons/Restore';
import WidgetsIcon from '@material-ui/icons/Widgets';

const CustomNodeFlow = () => {
  const [mainElementsSize, setMainElementsSize] = useState(defaultLayout);
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [trainDialog, setTrainDialog] = useState(false);
  const reactFlowWrapper = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const scenarioSelector = useSelector((state) => state.scenario);
  const classes = useStyles({
    left: mainElementsSize.leftDrawerWidth,
    right: mainElementsSize.rightDrawerWidth,
  });

  const leftButtons = [
    {
      name: 'input',
      title: 'Add Node',
      handler: () => {
        onAdd();
      },
      icon: <WidgetsIcon />,
      isDraggable: true,
    },
    {
      name: 'save',
      title: 'Save Layout',
      handler: () => {
        onSave();
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

  const onDrawerOpen = (side) => {
    if (side === 'left') {
      setMainElementsSize((prevState) => {
        if (prevState.leftDrawer === 2) return prevState;
        return handleDrawer('left', prevState, true, 240, 2, -1);
      });
    } else {
      setMainElementsSize((prevState) => {
        if (prevState.rightDrawer === 3) return prevState;
        return handleDrawer('right', prevState, true, 370, 3, -2);
      });
    }
  };
  const onDrawerClose = (side) => {
    if (side === 'left') {
      setMainElementsSize((prevState) =>
        handleDrawer('left', prevState, false, 0, 1, 1)
      );
    } else {
      setMainElementsSize((prevState) =>
        handleDrawer('right', prevState, false, 0, 1, 2)
      );
    }
  };

  const onElementsRemove = useCallback((elementsToRemove) => {
    setElements((els) => removeElements(elementsToRemove, els));
  }, []);

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
  const onSave = useCallback(() => {
    if (reactflowInstance) {
      const flow = reactflowInstance.toObject();
      const { scenarioConfigName } = scenarioSelector.currentScenario;

      // Change nodes name for building strong relations between nodes
      const mappedElements = {};
      flow.elements.forEach((element, i) => {
        if (element.data) {
          mappedElements[
            element.id
          ] = `${element.data.name}_${element.data.intent}_${i}`;
          element.id = `${element.data.name}_${element.data.intent}_${i}`;
        } else {
          element.source = mappedElements[element.source];
          element.target = mappedElements[element.target];
        }
      });
      dispatch(updateConfiguration(scenarioConfigName, flow.elements));
    }
  }, [reactflowInstance, scenarioSelector]);

  useEffect(() => {
    const scenarioName = location.pathname.replace('/conversation/', '');
    dispatch(getConfiguration(scenarioName));
  }, []);

  useEffect(() => {
    if (reactflowInstance && elements.length > 0) {
      reactflowInstance.fitView();
    }
  }, [reactflowInstance, elements.length]);
  useEffect(() => {
    const scenario = scenarioSelector.currentScenario;
    setElements(scenario ? scenario.scenarioConfigData : []);
  }, [scenarioSelector]);

  // const onRestore = useCallback(() => {
  // const restoreFlow = async () => {
  //restore from redux maybe?
  // const flow = await localforage.getItem('flowKey');
  //   if (flow) {
  //     const [x = 0, y = 0] = flow.position;
  //     setElements(flow.elements || []);
  //     transform({ x, y, zoom: flow.zoom || 0 });
  //   }
  // };
  //   restoreFlow();
  // }, [setElements, transform]);

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
            classes={classes}
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
              style={{ background: initBgColor }}
              onLoad={onLoad}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              connectionLineStyle={connectionLineStyle}
              snapToGrid={true}
              snapGrid={snapGrid}
              style={graphStyles}
            >
              <Controls />
              <MiniMap
                nodeStrokeColor={(n) => handleNodeStrokeColor(n)}
                nodeColor={(n) =>
                  n.type === 'selectorInputNode' ? initBgColor : '#fff'
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
            classes={classes}
            defaultZoom={1}
            node={selectedNode}
            elements={elements}
            setElements={setElements}
            side='right'
            title={scenarioSelector && scenarioSelector.currentScenario && scenarioSelector.currentScenario.scenarioConfigName}
          />
        </Grid>
      </Grid>
      <TrainDialog openDialog={trainDialog} handleClickClose={setTrainDialog} />
    </div>
  );
};
export default CustomNodeFlow;
