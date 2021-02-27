import React, { useState, useEffect, useCallback } from 'react';
import useStyles from './conversationStyle';
import SideDrawer from './Drawer';
import ConversationHeader from './ConversationHeader';

import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
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
  const leftButtons = [
    { key: 'Input Node', value: onAdd },
    { key: 'Output Node', value: onAdd },
  ];

  const handleLeftDrawerOpen = () => {
    setOpenLeft(true);
    setLeftDrawerWidth(240);
    setConversationBuilderSize((prevState) => prevState - 1);
    setLeftDrawerSize(2);
  };

  const handleLeftDrawerClose = () => {
    setOpenLeft(false);
    setLeftDrawerWidth(0);
    setConversationBuilderSize((prevState) => prevState + 1);
    setLeftDrawerSize(1);
  };

  const handleRightDrawerOpen = () => {
    setOpenRight(true);
    setRightDrawerWidth(240);
    setConversationBuilderSize((prevState) => prevState - 1);
    setRightDrawerSize(2);
  };

  const handleRightDrawerClose = () => {
    setOpenRight(false);
    setRightDrawerWidth(0);
    setConversationBuilderSize((prevState) => prevState + 1);
    setRightDrawerSize(1);
  };

  return (
    <div className={classes.root}>
      <ConversationHeader
        classes={classes}
        openLeft={openLeft}
        openRight={openRight}
        handleLeftDrawerOpen={handleLeftDrawerOpen}
        handleRightDrawerOpen={handleRightDrawerOpen}
      />
      <Grid container spacing={3}>
        <Grid xs={leftDrawerSize}>
          <SideDrawer
            open={openLeft}
            drawerOpen={classes.drawerLeftOpen}
            drawerClose={classes.drawerLeftClose}
            handleDrawerClose={handleLeftDrawerClose}
            handleDrawerOpen={handleLeftDrawerOpen}
            buttons={leftButtons}
            actions={[]}
            classes={classes}
            side='left'
          />
        </Grid>
        <Grid item xs={conversationBuilderSize}>
          {/* <Grid item> */}
          <main className={classes.content}>
            <Paper className={classes.conversation}></Paper>
            <ReactFlow
              elements={elements}
              onElementClick={onElementClick}
              onElementsRemove={onElementsRemove}
              onConnect={onConnect}
              onNodeDragStop={onNodeDragStop}
              style={{ background: bgColor }}
              onLoad={onLoad}
              nodeTypes={nodeTypes}
              connectionLineStyle={connectionLineStyle}
              snapToGrid={true}
              snapGrid={snapGrid}
              defaultZoom={1.5}
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
          {/* </Grid> */}
        </Grid>
        <Grid xs={rightDrawerSize}>
          <SideDrawer
            open={openRight}
            drawerOpen={classes.drawerRightOpen}
            drawerClose={classes.drawerRightClose}
            handleDrawerClose={handleRightDrawerClose}
            handleDrawerOpen={handleRightDrawerOpen}
            buttons={[]}
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
