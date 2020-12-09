import React from 'react';
import { connect } from 'react-redux';

import {
  setOnSort,
  setBubbleColor,
  //   setQuickColor,
  //   setMergeColor,
  //   setCityLocation,
  //   setStateLocation,
  //   setMessage,
  //   fetchJobData,
  setButtonColor,
} from '../actions';

const BubbleSort = props => {
  const startBubbleSort = () => {
    if (
      props.bubbleColor === '' &&
      // this.state.bubbleColor === '' &&
      props.quickColor === '' &&
      // this.state.quickColor === '' &&
      // this.state.mergeColor === '' &&
      props.mergeColor === '' &&
      props.onSort === false &&
      props.locationSubmitted === true
    ) {
      //   this.setState({
      //     // bubbleColor: '#f08a5d',
      //     // onSort: true,
      //     buttonColor: '#00587a',
      //   });
      props.setBubbleColor('#f08a5d');
      props.setOnSort(true);
      props.setButtonColor('#00587a');

      console.log('on bubblesort');

      //   let self = this;
      let count = 0;
      let round = 0;
      //flag indicates whether a bar has been swapped during this round

      let flag = true;
      let endFlag = false;

      let myInterval = setInterval(() => {
        if (count === 0) {
        }
        function swap(input, indexA, indexB) {
          flag = false;
          let temp = input[indexA];
          input[indexA] = input[indexB];
          input[indexB] = temp;
          return input;
        }

        if (endFlag === true || count === 9) {
          //   let dataArray = self.state.resultArray;
          let dataArray = [...props.resultArray];
          if (dataArray[8][1] > dataArray[9][1]) {
            swap(dataArray, 8, 9);
            // self.setState({
            //   resultArray: dataArray,
            // });
            props.updateGraph(dataArray);
          }

          if (round < 9) {
            dataArray[9 - round][3] = 2;
            dataArray[9 - round - 1][3] = 0;
          } else {
            dataArray[9 - round][3] = 2;
          }

          //   self.setState({
          //     resultArray: dataArray,
          //   });
          props.updateGraph(dataArray);
          round++;
          //if at the end of the array and no swaps, all items are sorted
          if (flag === true) {
            let dataArray = [...props.resultArray];
            // let dataArray = self.state.resultArray;
            //Update each bar color to green
            dataArray.forEach(element => {
              element[3] = 2;
            });

            // self.setState({
            //   resultArray: dataArray,
            //   // onSort: false,
            //   buttonColor: '#fff',
            // });
            props.setOnSort(false);
            props.setButtonColor('#fff');
            props.updateGraph(dataArray);
            clearInterval(myInterval);
          } else {
            count = 0;
            flag = true;
          }
          endFlag = false;
          return;
        } else {
          //   let dataArray = self.state.resultArray;
          let dataArray = [...props.resultArray];
          if (count === 0) {
            //if first count, have to color first two yellow
            dataArray[0][3] = 1;
            dataArray[1][3] = 1;
            // self.setState({
            //   resultArray: dataArray,
            // });
            props.updateGraph(dataArray);
            count++;
          } else {
            if (dataArray[count - 1][1] > dataArray[count][1]) {
              swap(dataArray, count - 1, count);
              //   self.setState({
              //     resultArray: dataArray,
              //   });
              props.updateGraph(dataArray);
            } else {
              if (dataArray[count + 1][3] !== 2) {
                //if the next one isn't green/already sorted, continue
                dataArray[count - 1][3] = 0;
                dataArray[count + 1][3] = 1;
                // self.setState({
                //   resultArray: dataArray,
                // });
                props.updateGraph(dataArray);
              } else if (dataArray[count + 1][3] === 2) {
                endFlag = true;
              }
              count++;
            }
          }
        }
      }, 140);
    }
  };

  return (
    <div>
      <button
        onClick={startBubbleSort}
        // onClick={
        //   () => startBubbleSort
        //   props.updateGraph([
        //     ['Javascript', 17.16, 0, 0, 5],
        //     ['PHP', 2.44, 0, 0, 6],
        //     ['Java', 17.56, 0, 0, 7],
        //     ['C#', 8.22, 0, 0, 8],
        //     ['Typescript', 0.2, 0, 0, 0],
        //     ['Ruby', 1.52, 0, 0, 1],
        //     ['Python', 27.21, 0, 0, 2],
        //     ['C++', 22.84, 0, 0, 3],
        //     ['Golang', 0.4, 0, 0, 9],
        //     ['Swift', 2.34, 0, 0, 4],
        //   ])
        // }
        className='sortingAlgorithm'
        style={{ color: props.bubbleColor }}
      >
        Bubble Sort
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    onSort: state.onSort,
    bubbleColor: state.bubbleColor,
    quickColor: state.quickColor,
    mergeColor: state.mergeColor,
    // cityLocation: state.cityLocation,
    // stateLocation: state.stateLocation,
    // message: state.message,
    // loading: state.jobData.loading,
    // jobData: state.jobData.jobData,
    // error: state.jobData.error,
    locationSubmitted: state.jobData.locationSubmitted,
  };
};

export default connect(mapStateToProps, {
  setOnSort,
  setBubbleColor,
  //   setQuickColor,
  //   setMergeColor,
  //   setCityLocation,
  //   setStateLocation,
  //   setMessage,
  //   fetchJobData,
  setButtonColor,
})(BubbleSort);

// export default BubbleSort;
