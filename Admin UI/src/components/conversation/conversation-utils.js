
import dagre from 'dagre';
import InputNode from './InputNode';

export const defaultLayout = {
  leftDrawer: 1,
  rightDrawer: 1,
  conversationBuilder: 10,
  openLeft: false,
  openRight: false,
  leftDrawerWidth: 0,
  rightDrawerWidth: 0,
}

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
    position,
  };
};

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
      el.targetPosition = isHorizontal ? 'top' : 'left';
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
};

export const handleOnDrop = (
  event,
  reactflowInstance,
  reactFlowWrapper,
  elements
) => {
  reactflowInstance.fitView();
  const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  const type = event.dataTransfer.getData('application/reactflow');
  const position = reactflowInstance.project({
    x: event.clientX - reactFlowBounds.left,
    y: event.clientY - reactFlowBounds.top,
  });
  if (type === 'input') return createInputNode(getNodeId(), position, elements);
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
  if (node === 'input') return createInputNode(id, position);
};

export const handleDrawer = (
  side,
  prevState,
  setOpen,
  drawerWidth,
  drawerSize,
  conversationSize
) => {
  if (side === 'left') {
    return {
      ...prevState,
      openLeft: setOpen,
      leftDrawerWidth: drawerWidth,
      leftDrawer: drawerSize,
      conversationBuilder: prevState.conversationBuilder + conversationSize,
    };
  }
  return {
    ...prevState,
    openRight: setOpen,
    rightDrawerWidth: drawerWidth,
    rightDrawer: drawerSize,
    conversationBuilder: prevState.conversationBuilder + conversationSize,
  };
};
// left Drawer buttons
// const actions = [
//   {
//     name: 'calendar',
//     title: 'Calendar',
//     handler: () => {
//       console.log('handler');
//     },
//     icon: <CalendarTodayIcon />,
//   },
//   {
//     name: 'laser',
//     title: 'Laser Pointer',
//     handler: () => {
//       console.log('handler');
//     },
//     icon: <BrushIcon />,
//   },
//   {
//     name: 'equipment',
//     title: 'Equipment List',
//     handler: () => {
//       console.log('handler');
//     },
//     icon: <ListIcon />,
//   },
//   {
//     name: 'video',
//     title: 'Video Library',
//     handler: () => {
//       console.log('handler');
//     },
//     icon: <MovieIcon />,
//   },
//   {
//     name: 'locations',
//     title: 'Location of Positions',
//     handler: () => {
//       console.log('handler');
//     },
//     icon: <LocationOnIcon />,
//   },
// ];
// const utils = [
//   {
//     name: 'vertical layout',
//     title: 'Vertical Layout',
//     handler: onLayout,
//     icon: <SwapVerticalCircleIcon />,
//     isDraggable: false,
//   },
//   {
//     name: 'horizontal layout',
//     title: 'Horizontal Layout',
//     handler: onLayout,
//     icon: <SwapHorizontalCircleIcon />,
//     isDraggable: false,
//   },
// ];
