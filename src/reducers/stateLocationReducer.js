export default (state = '', action) => {
  switch (action.type) {
    case 'STATE_LOCATION':
      return action.payload;
    default:
      return state;
  }
};
