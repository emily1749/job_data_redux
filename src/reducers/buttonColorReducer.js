export default (state = '', action) => {
  switch (action.type) {
    case 'BUtTON_COLOR':
      return action.payload;
    default:
      return state;
  }
};
