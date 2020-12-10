import jobData from '../api/jobData';

export const fetchJobData = (city, state) => dispatch => {
  console.log('fetch job data');
  dispatch({ type: 'TOGGLE_LOADING' });
  // const response = await
  console.log(`${jobData}${city}/${state}`);
  jobData
    .get(`${city}/${state}`)
    .then(value => {
      console.log('value');
      console.log(value.data);
      dispatch({ type: 'STORE_VALUE', payload: value.data });
      dispatch({ type: 'COPY_VALUE', payload: value.data });
    })
    .catch(error => {
      dispatch({ type: 'FETCH_ERROR', payload: error });
    });
  // console.log(response.data);

  // dispatch({ type: 'FETCH_JOB_DATA', payload: response.data });
};

// export const setResultArray = arr => {
//   return {
//     type: 'UPDATE_RESULT_ARRAY',
//     payload: arr,
//   };
// };

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

export const setMessage = msg => {
  return {
    type: 'MESSAGE',
    payload: msg,
  };
};
