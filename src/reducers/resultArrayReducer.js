export default (state = null, action) => {
  switch (action.type) {
    case 'COPY_VALUE':
      console.log('in result arr reducer + response');
      let response = { ...action.payload };
      console.log(response);
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

      console.log('arr copy' + resultArrayCopy);
      return {
        jobData: [...resultArrayCopy],
      };

    default:
      return state;
  }
};
