import React, { useState, useEffect, useCallback } from 'react';
import ReactFlow, {
  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from 'react-flow-renderer';
import InputNode from './InputNode';
import '../../index.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  createEdge,
  createInputNode,
  createOutputNode,
} from './conversation-utils';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '../Menu';
import NodeToolBar from '../NodeToolBar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';

const MenuControl = ({
  menuSize,
  setMenu,
  setConversationBuilderSize,
  setMenuSize,
  classes,
  buttons,
}) => {
  return (
    <Grid item xs={menuSize} className={classes.menuControl}>
      <Paper className={classes.sidebar}>
        <Menu buttons={buttons} />
      </Paper>
      <Button
        className={classes.arrowLeft}
        onClick={() => {
          setMenu(false);
          setConversationBuilderSize((prevState) => prevState + 1);
          setMenuSize((prevState) => prevState - 1);
        }}
      >
        <ChevronLeftIcon className={classes.arrows} />
      </Button>
    </Grid>
  );
};

const ToolBarControl = ({
  toolBarSize,
  setToolBar,
  setConversationBuilderSize,
  setToolBarSize,
  classes,
}) => {
  return (
    <Grid item xs={toolBarSize} className={classes.toolBarControl}>
      <Button
        className={classes.arrowRight}
        onClick={() => {
          console.log('toolbar -1');
          setToolBar(false);
          setConversationBuilderSize((prevState) => prevState + 1);
          setToolBarSize((prevState) => prevState - 1);
        }}
      >
        <ChevronRightIcon className={classes.arrows} />
      </Button>
      <Paper className={classes.sidebar}>
        <NodeToolBar />
      </Paper>
    </Grid>
  );
};

const HamburgerSideBar = ({
  sidebarSize,
  setSideBar,
  setConversationBuilderSize,
  setSidebarSize,
  style,
}) => {
  return (
    <Grid item xs={sidebarSize}>
      <Button
        className={style}
        onClick={() => {
          setSideBar(true);
          setConversationBuilderSize((prevState) => prevState - 1);
          setSidebarSize((prevState) => prevState + 1);
        }}
      >
        <MenuIcon fontSize='large' />
      </Button>
    </Grid>
  );
};

const initialElements = [
  {
    id: '1',
    type: 'output',
    data: {
      label: (
        <div>
          <div>Welcome</div>
          <TextField
            id='outlined-textarea'
            label='Speak'
            placeholder='Placeholder'
            multiline
            variant='outlined'
          />
        </div>
      ),
    },
    position: { x: 0, y: 50 },
    sourcePosition: 'right',
  },
  {
    id: '2',
    type: 'selectorInputNode',
    style: {
      border: '1px solid #777',
      padding: 10,
      backgroundColor: 'white',
    },
    position: { x: 300, y: 50 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'alert-Hello' },
    position: { x: 650, y: 25 },
    targetPosition: 'left',
  },
  {
    id: '4',
    type: 'output',
    data: { label: 'Output B' },
    position: { x: 650, y: 100 },
    targetPosition: 'left', // where the edge is going to
  },
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    style: { stroke: '#fff' },
  },
  {
    id: 'e2a-3',
    source: '2',
    target: '3',
    sourceHandle: 'a',
    animated: true,
    style: { stroke: '#fff' },
  },
  {
    id: 'e2b-4',
    source: '2',
    target: '4',
    sourceHandle: 'b',
    animated: true,
    style: { stroke: '#fff' },
  },
];

const useStyles = makeStyles((theme) => ({
  buttons: {
    zIndex: 2,
  },
  sidebar: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    backgroundColor: '#ffffff',
    border: '1px solid grey',
  },
  arrowLeft: {
    position: 'relative',
    bottom: '15px',
    right: '15px',
  },
  arrowRight: {
    position: 'relative',
    bottom: '15px',
    left: '15px',
  },
  menuControl: {
    alignItems: 'baseline',
    display: 'flex',
  },
  arrows: {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  toolBarControl: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
}));

const graphStyles = {
  width: '100%',
  height: '100vh',
  background: 'rgb(26, 25, 43)',
};
const flowKey = 'example-flow';
const getNodeId = () => `randomnode_${+new Date()}`;

const onNodeDragStop = (event, node) => console.log('drag stop', node);
const onElementClick = (event, element) => console.log('click', element);
const initBgColor = 'white';
const connectionLineStyle = { stroke: '#fff' };
const snapGrid = [20, 20];
const nodeTypes = {
  selectorInputNode: InputNode,
};
const CustomNodeFlow = () => {
  const classes = useStyles();
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [bgColor, setBgColor] = useState(initBgColor);

  const [menu, setMenu] = useState(false);
  const [toolBar, setToolBar] = useState(false);
  const [conversationBuilderSize, setConversationBuilderSize] = useState(10);
  const [toolBarSize, setToolBarSize] = useState(1);
  const [menuSize, setMenuSize] = useState(1);

  useEffect(() => {
    // const onChange = (event) => {
    //   setElements((els) =>
    //     els.map((e) => {
    //       if (isEdge(e) || e.id !== '2') {
    //         return e;
    //       }
    //       const color = event.target.value;
    //       setBgColor(color);
    //       return {
    //         ...e,
    //         data: {
    //           ...e.data,
    //           color,
    //         },
    //       };
    //     })
    //   );
    // };
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
      if (node === 'input') {
        newNode = createInputNode(id, position);
      }
      if (node === 'output') {
        newNode = createOutputNode(id, position, 'Right');
      }
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
  const buttons = [
    { key: 'Input Node', value: onAdd },
    { key: 'Output Node', value: onAdd },
  ];
  return (
    <>
      {menu ? (
        <MenuControl
          menuSize={menuSize}
          setMenu={setMenu}
          setConversationBuilderSize={setConversationBuilderSize}
          setMenuSize={setMenuSize}
          classes={classes}
          buttons={buttons}
        />
      ) : (
        <HamburgerSideBar
          sidebarSize={menuSize}
          setSideBar={setMenu}
          setConversationBuilderSize={setConversationBuilderSize}
          setSidebarSize={setMenuSize}
          style={classes.arrowRight}
        />
      )}
      <Grid item xs={conversationBuilderSize}>
        <Grid item>
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
            {/* <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === 'input') return '#0041d0';
            if (n.type === 'selectorNode') return bgColor;
            if (n.type === 'output') return '#ff0072';
          }}
          nodeColor={(n) => {
            if (n.type === 'selectorNode') return bgColor;
            return '#fff';
          }}
        /> */}
            <Controls />
            <Background color='#aaa' gap={16} />
            <div className='save__controls'>
              <Button
                variant='contained'
                onClick={() => {
                  onAdd('input');
                }}
              >
                add Input node
              </Button>
              <Button
                className={classes.buttons}
                variant='contained'
                onClick={() => {
                  onAdd('output');
                }}
              >
                add output node
              </Button>
            </div>
          </ReactFlow>
        </Grid>
      </Grid>
      {toolBar ? (
        <ToolBarControl
          toolBarSize={toolBarSize}
          setToolBar={setToolBar}
          setConversationBuilderSize={setConversationBuilderSize}
          setToolBarSize={setToolBarSize}
          classes={classes}
        />
      ) : (
        <HamburgerSideBar
          sidebarSize={toolBarSize}
          setSideBar={setToolBar}
          setConversationBuilderSize={setConversationBuilderSize}
          setSidebarSize={setToolBarSize}
          style={classes.arrowRight}
        />
      )}
    </>
  );
};
export default CustomNodeFlow;
