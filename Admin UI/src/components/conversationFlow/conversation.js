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
  const [reactflowInstance, setReactflowInstance] = useState(null);
  const [elements, setElements] = useState([]);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [id, setId] = useState(5);

  useEffect(() => {
    const onChange = (event) => {
      setElements((els) =>
        els.map((e) => {
          if (isEdge(e) || e.id !== '2') {
            return e;
          }
          const color = event.target.value;
          setBgColor(color);
          return {
            ...e,
            data: {
              ...e.data,
              color,
            },
          };
        })
      );
    };
    setElements([
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
    ]);
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
        newNode = createOutputNode(id, position,'Right');
      }
      setElements((els) => els.concat(newNode));
    },
    [setElements]
  );

  // const onOutputAdd = useCallback(
  //   (node) => {
  //     const position = { x: node.screenX, y: node.screenY };
  //     const newNode = createOutputNode(id, setId, position,'Right');
  //     setElements((els) => els.concat(newNode));
  //   },
  //   [setElements]
  // );

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
  return (
    <div style={{ height: '100%' }}>
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
      </ReactFlow>
      <div className='save__controls'>
        {/* <button onClick={onSave}>save</button>
        <button onClick={onRestore}>restore</button> */}
        <button
          onClick={() => {
            onAdd('input');
          }}
        >
          add Input node
        </button>
        <button
          onClick={() => {
            onAdd('output');
          }}
        >
          add output node
        </button>
      </div>
    </div>
  );
};
export default CustomNodeFlow;
