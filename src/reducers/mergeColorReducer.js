export default (state = '', action) => {
  switch (action.type) {
    case 'MERGE_COLOR':
      return action.payload;
    default:
      return state;
  }
};
