import jobData from '../api/jobData';

export const setCityLocation = cityLocation => {
  return {
    type: 'CITY_LOCATION',
    payload: cityLocation,
  };
};

export const setStateLocation = stateLocation => {
  return {
    type: 'STATE_LOCATION',
    payload: stateLocation,
  };
};

export const setOnSort = boolean => {
  return {
    type: 'ON_SORT',
    payload: boolean,
  };
};

export const setBubbleColor = color => {
  return {
    type: 'BUBBLE_COLOR',
    payload: color,
  };
};

export const setQuickColor = color => {
  return {
    type: 'QUICK_COLOR',
    payload: color,
  };
};

export const setMergeColor = color => {
  return {
    type: 'MERGE_COLOR',
    payload: color,
  };
};

export const setlocationSubmitted = bool => {
  return {
    type: 'LOCATION_SUBMITTED',
    payload: bool,
  };
};

export const setButtonColor = color => {
  return {
    type: 'BUTTON_COLOR',
    payload: color,
  };
};
