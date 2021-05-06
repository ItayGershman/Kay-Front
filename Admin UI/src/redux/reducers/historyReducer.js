const {
  HISTORY_GET_ALL_REQUEST,
  HISTORY_GET_ALL_SUCCESS,
  HISTORY_GET_ALL_FAIL,
  HISTORY_GET_REQUEST,
  HISTORY_GET_SUCCESS,
  HISTORY_GET_FAIL,
  HISTORY_DELETE_REQUEST,
  HISTORY_DELETE_SUCCESS,
  HISTORY_DELETE_FAIL,
} = require('../constants/actionTypes');

const initialState = {
  conversations: [
    {
      id: 1,
      date: '28/02/2021',
      title: '28/02/2021 - 1',
      text: [
        {
          name: 'Kay',
          message: 'This should be in left ',
          time: '16:35:00',
          direction: 'left',
        },
        {
          name: 'User',
          message: 'This should be in right',
          time: '16:35:10',
          direction: 'right',
        },
        {
          name: 'Kay',
          message: 'This should be in left again',
          time: '16:35:20',
          direction: 'left',
        },
        {
          name: 'User',
          message: 'This should be in right again',
          time: '16:35:40',
          direction: 'right',
        },
      ],
    },
    {
      id: 2,
      date: '28/02/2021',
      title: '28/02/2021 - 2',
      text: [
        {
          name: 'Kay',
          message: 'This should be in left ',
          time: '12:22:00',
          direction: 'left',
        },
        {
          name: 'User',
          message: 'This should be in right',
          time: '12:22:15',
          direction: 'right',
        },
      ],
    },
    {
      id: 3,
      date: '28/02/2021',
      title: '28/02/2021 - 3',
      text: [
        {
          name: 'Kay',
          message: 'This should be in left ',
          time: '10:12:42',
          direction: 'left',
        },
        {
          name: 'User',
          message: 'This should be in right',
          time: '10:13:00',
          direction: 'right',
        },
      ],
    },
    {
      id: 4,
      date: '28/02/2021',
      title: '28/02/2021 - 4',
      text: [
        {
          name: 'Kay',
          message: 'This should be in left ',
          time: '11:16:21',
          direction: 'left',
        },
        {
          name: 'User',
          message: 'This should be in right',
          time: '11:16:35',
          direction: 'right',
        },
      ],
    },
    {
      id: 5,
      date: '28/02/2021',
      title: '28/02/2021 - 5',
      text: [
        {
          name: 'Kay',
          message: 'This should be in left ',
          time: '09:36:27',
          direction: 'left',
        },
        {
          name: 'User',
          message: 'This should be in right',
          time: '09:36:51',
          direction: 'right',
        },
      ],
    },
    {
      id: 6,
      date: '28/02/2021',
      title: '28/02/2021 - 6',
      text: [
        {
          name: 'Kay',
          message: 'This should be in left ',
          time: '20:20:20',
          direction: 'left',
        },
        {
          name: 'User',
          message: 'This should be in right',
          time: '20:20:30',
          direction: 'right',
        },
      ],
    },
  ], //array of conversation(exampleObject)
  conversation: null,
  error: '',
  //   exampleObject: {
  //     date: '28/02/2021',
  //     conversationTitle: 'could be - Date no.xxx',
  //     text: [
  //       {
  //         name: 'Kay',
  //         message: 'This should be in left ',
  //         time: '16:35:00',
  //         direction: 'left',
  //       },
  //       {
  //         name: 'User',
  //         message: 'This should be in right',
  //         time: '16:35:10',
  //         direction: 'right',
  //       },
  //     ],
  //   },
};

function historyReducer(state = initialState, action) {
  switch (action.type) {
    case HISTORY_GET_ALL_REQUEST:
      return { ...state, loading: true };
    case HISTORY_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        conversations: state.conversations,
        conversation: state.conversations[0],
      };
    case HISTORY_GET_ALL_FAIL:
      return { ...state, loading: false, error: action.payload };

    case HISTORY_GET_REQUEST:
      return { ...state, loading: true };
    case HISTORY_GET_SUCCESS:
      let conversation = state.conversations.find(
        (con) => con.id === action.payload
      );
      if (!conversation) {
        if (state.conversations.length > 0)
          conversation = state.conversations[0];
      }
      return {
        ...state,
        loading: false,
        conversation,
      };
    case HISTORY_GET_FAIL:
      return { ...state, loading: false, error: action.payload };

    case HISTORY_DELETE_REQUEST:
      return { ...state, loading: true };
    case HISTORY_DELETE_SUCCESS:
      const conversations = state.conversations.filter(
        (con) => con.id !== action.payload
      );
      return {
        ...state,
        loading: false,
        conversations,
      };
    case HISTORY_DELETE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default historyReducer;
