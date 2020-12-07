export default (state = false, action) => {
  switch (action.type) {
    case 'LOCATION_SUBMITTED':
      return action.payload;
    default:
      return state;
  }
};
