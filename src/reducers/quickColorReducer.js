export default (state = '', action) => {
  switch (action.type) {
    case 'QUICK_COLOR':
      return action.payload;
    default:
      return state;
  }
};
