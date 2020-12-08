export default (state = '', action) => {
  switch (action.type) {
    case 'CITY_LOCATION':
      return action.payload;
    default:
      return state;
  }
};
