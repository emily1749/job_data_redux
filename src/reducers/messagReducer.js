export default (state = 'Please enter location', action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.payload;
    default:
      return state;
  }
};
