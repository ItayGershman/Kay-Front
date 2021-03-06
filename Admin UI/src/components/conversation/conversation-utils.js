import React from 'react';
import TextField from '@material-ui/core/TextField';
import dagre from 'dagre';
import InputNode from './InputNode';
import OutputNode from './OutputNode';

export const createEdge = (source, target, sourceHandle) => {
  return {
    id: `e${source}${sourceHandle}-${target}`,
    source,
    target,
    sourceHandle,
    animated: true,
    style: { stroke: '#fff' },
  };
};

const createInputNode = (id, position, elements) => {
  return {
    id,
    type: 'selectorInputNode',
    style: {
      border: '1px solid #777',
      padding: 10,
      backgroundColor: 'white',
    },
    position,
    data: elements,
  };
};

const createOutputNode = (id, position, sourcePosition, targetPosition) => {
  return {
    id,
    type: 'selectorOutputNode',

    position,
    sourcePosition,
  };
};

export const initialElements = [
  {
    id: '1',
    type: 'selectorOutputNode',
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
    // sourcePosition: 'left',
    // targetPosition:'right'
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
    targetPosition: 'left',
  },
  // {
  //   id: '3',
  //   type: 'output',
  //   data: { label: 'alert-Hello' },
  //   position: { x: 650, y: 25 },
  //   targetPosition: 'left',
  // },
  // {
  //   id: '4',
  //   type: 'output',
  //   data: { label: 'Output B' },
  //   position: { x: 650, y: 100 },
  //   targetPosition: 'left', // where the edge is going to
  // },
  // {
  //   id: 'e1-2',
  //   source: '1',
  //   target: '2',
  //   animated: true,
  //   style: { stroke: '#fff' },
  // },
  // {
  //   id: 'e1-2',
  //   source: '1',
  //   target: '2',
  //   animated: true,
  //   style: { stroke: '#fff' },
  // },
  // {
  //   id: 'e2a-3',
  //   source: '2',
  //   target: '3',
  //   sourceHandle: 'a',
  //   animated: true,
  //   style: { stroke: '#fff' },
  // },
  // {
  //   id: 'e2b-4',
  //   source: '2',
  //   target: '4',
  //   sourceHandle: 'b',
  //   animated: true,
  //   style: { stroke: '#fff' },
  // },
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutElements = (elements, direction = 'TB', isNode) => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: 150, height: 50 });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });
  dagre.layout(dagreGraph);
  return elements.map((el) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? 'left' : 'top';
      el.sourcePosition = isHorizontal ? 'right' : 'bottom';
      // unfortunately we need this little hack to pass a slighltiy different position
      // in order to notify react flow about the change
      el.position = {
        x: nodeWithPosition.x + Math.random() / 1000,
        y: nodeWithPosition.y,
      };
    }
    return el;
  });
};

export const graphStyles = {
  width: '100%',
  height: '100vh',
  background: 'rgb(26, 25, 43)',
};

export const handleNodeStrokeColor = (n) => {
  if (n.style?.background) return n.style.background;
  if (n.type === 'input') return '#0041d0';
  if (n.type === 'selectorInputNode') return '#0041d0';
  if (n.type === 'output') return '#ff0072';
};
const getNodeId = () => `randomnode_${+new Date()}`;
export const onNodeDragStop = (event, node) => console.log('drag stop', node);
export const onElementClick = (event, element, setSelectedNode) =>
  setSelectedNode(element);
export const initBgColor = 'white';
export const connectionLineStyle = { stroke: '#fff' };
export const snapGrid = [20, 20];
export const nodeTypes = {
  selectorInputNode: InputNode,
  selectorOutputNode: OutputNode,
};

export const handleOnDrop = (event, reactflowInstance, reactFlowWrapper,elements) => {
  reactflowInstance.fitView();
  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  const type = event.dataTransfer.getData('application/reactflow');
  const position = reactflowInstance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  });
  if (type === 'input') return createInputNode(getNodeId(), position, elements);
  if (type === 'output') return createOutputNode(getNodeId(), position);
  if (type === 'default')
    return { id: getNodeId(), type, position, data: { label: `${type} node` } };
  return {};
};

export const handleOnAdd = (node) => {
  const position = {
    x: Math.random() * window.innerWidth - 100,
    y: Math.random() * window.innerHeight,
  };
  let id = getNodeId();
  console.log(position);
  if (node === 'input') return createInputNode(id, position);
  if (node === 'output') return createOutputNode(id, position, 'Right');
};
