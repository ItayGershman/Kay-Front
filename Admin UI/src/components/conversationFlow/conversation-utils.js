import React from 'react';
import TextField from '@material-ui/core/TextField';
import dagre from 'dagre';



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

export const createInputNode = (id, position) => {
  return {
    id,
    type: 'selectorInputNode',
    style: {
      border: '1px solid #777',
      padding: 10,
      backgroundColor: 'white',
    },
    position,
  };
};

export const createOutputNode = (id, position, sourcePosition) => {
  return {
    id,
    type: 'output',
    data: {
      label: (
        <div>
          <div>Welcome</div>
          <TextField
            id={`outlined-textarea+_${id}`}
            label='Speak'
            placeholder='Placeholder'
            multiline
            variant='outlined'
          />
        </div>
      ),
    },
    position,
    sourcePosition,
  };
};

export const initialElements = [
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

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

export const getLayoutedElements = (elements, direction = 'TB',isNode) => {
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