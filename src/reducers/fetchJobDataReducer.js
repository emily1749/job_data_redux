const initialState = {
  jobDataCopy: [],
  resultArray: [],
  loading: false,
  error: false,
  locationSubmitted: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        loading: !state.loading,
      };
    case 'STORE_VALUE':
      if (state.jobDataCopy === []) {
        let response = { ...action.payload };

        let totalNumberOfJobs = 0;
        let resultArrayFetch = [];

        Object.values(response).forEach(function(value) {
          totalNumberOfJobs += value;
        });

        for (const [key, value] of Object.entries(response)) {
          let keyResult = key;
          let percentage = ((value / totalNumberOfJobs) * 100).toFixed(2);
          resultArrayFetch.push([keyResult, percentage]);
        }

        resultArrayFetch.forEach((element, index) => {
          let percent = element[1];
          element[1] = parseFloat(percent);

          element.push(0);
        });
        const resultArrayCopy = JSON.parse(JSON.stringify(resultArrayFetch));

        return {
          jobDataCopy: [...resultArrayCopy],
          resultArray: [...resultArrayCopy],
          loading: false,
          error: false,
          locationSubmitted: true,
        };
      } else {
        return {
          ...state,
          resultArray: action.payload,
        };
      }

    case 'ERROR_FETCHING':
      return {
        ...state,
        loading: false,
        error: true,
        locationSubmitted: false,
      };
    default:
      return state;
  }
};
