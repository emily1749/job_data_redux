export default (state = '', action) => {
  switch (action.type) {
    case 'BUBBLE_COLOR':
      return action.payload;
    default:
      return state;
  }
};
