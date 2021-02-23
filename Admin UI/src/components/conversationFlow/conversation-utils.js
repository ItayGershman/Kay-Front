import React from 'react';
import TextField from '@material-ui/core/TextField';

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
  console.log(id);
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
