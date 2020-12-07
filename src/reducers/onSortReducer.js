export default (state = false, action) => {
  switch (action.type) {
    case 'ON_SORT':
      return action.payload;

    default:
      return state;
  }
};
