import React from 'react';
import { connect } from 'react-redux';

import {
  setOnSort,
  setBubbleColor,
  //   setQuickColor,
  setMergeColor,
  //   setCityLocation,
  //   setStateLocation,
  //   setMessage,
  //   fetchJobData,
  setButtonColor,
} from '../actions';

const MergeSort = props => {
  const startMergeSort = async () => {
    if (
      props.bubbleColor === '' &&
      // this.state.bubbleColor === '' &&
      // this.state.quickColor === '' &&
      props.quickColor === '' &&
      // this.state.mergeColor === '' &&
      props.mergeColor === '' &&
      // this.state.onSort === false &&
      props.onSort === false &&
      props.locationSubmitted === true
    ) {
      //   this.setState({
      //     // mergeColor: '#f08a5d',
      //     // onSort: true,
      //     buttonColor: '#00587a',
      //   });
      props.setOnSort(true);
      props.setMergeColor('#f08a5d');
      props.setButtonColor('#00587a');
      console.log('on mergesort');

      let self = this;

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      async function changeColors(index, number) {
        // let dataArray = self.state.resultArray;
        let dataArray = [...props.resultArray];
        dataArray[index][3] = number;
        // self.setState({
        //   resultArray: dataArray,
        // });
        props.updateGraph(dataArray);
        await sleep(170);
      }

      async function changeSingleColor(item, number) {
        // let dataArray = self.state.resultArray;
        let dataArray = [...props.resultArray];
        //find where the item is in dataArray
        let index = dataArray.indexOf(item);
        dataArray[index][3] = number;

        // self.setState({
        //   resultArray: dataArray,
        // });

        props.updateGraph(dataArray);
        await sleep(170);
      }

      async function mergeSortAlgorithm(array) {
        if (array.length <= 1) {
          return array;
        }

        let middlePoint = Math.floor(array.length / 2),
          leftArray = await mergeSortAlgorithm(array.slice(0, middlePoint)),
          rightArray = await mergeSortAlgorithm(array.slice(middlePoint));

        let mergeResult = await merge(leftArray, rightArray);

        return mergeResult;
      }

      async function merge(arrayA, arrayB) {
        if (arrayA.length > 0 && arrayB.length > 0) {
          let arrayAIndex = arrayA[0][0];
          let lengthTotal = arrayA.length + arrayB.length;
          let sorted = [];
          //   let dataArray = self.state.resultArray;
          let dataArray = [...props.resultArray];
          let dataArrayCopy = [...dataArray];
          let indexA = 0;

          //identify first where we are in dataArray, set it to be indexA
          dataArray.forEach((element, index) => {
            if (element[0] === arrayAIndex) {
              indexA = index;
              return;
            }
          });

          //change the color of arrays so we can identify the left from right
          //arrayA = yellow, arrayB = purple
          await Promise.all([
            arrayA.forEach((element, index) => {
              changeSingleColor(element, 1);
            }),
          ]);
          await Promise.all([
            arrayB.forEach((element, index) => {
              changeSingleColor(element, 3);
            }),
          ]);

          await sleep(370);
          while (arrayA.length && arrayB.length) {
            // let dataArray = self.state.resultArray;
            let dataArray = [...props.resultArray];
            let dataArrayCopy = dataArray;

            await Promise.all([
              changeSingleColor(arrayA[0], 4),
              changeSingleColor(arrayB[0], 4),
            ]);

            if (arrayA[0][1] < arrayB[0][1]) {
              sorted.push(arrayA.shift());
            } else {
              sorted.push(arrayB.shift());
            }

            let resultMergeArray = sorted.concat(
              arrayA.slice().concat(arrayB.slice())
            );

            //merge the sorte with the entire dataArray
            let resultMergeReturn = dataArray
              .slice(0, indexA)
              .concat(resultMergeArray)
              .concat(dataArrayCopy.slice(lengthTotal + indexA, 10));

            // self.setState({
            //   resultArray: resultMergeReturn,
            // });

            props.updateGraph(resultMergeReturn);
            //change colors for the next loop

            await Promise.all([
              arrayA.forEach((element, index) => {
                changeSingleColor(element, 1);
              }),
            ]);
            await Promise.all([
              arrayB.forEach((element, index) => {
                changeSingleColor(element, 3);
              }),
            ]);
          }

          //create new updated array
          let resultMergeArray = sorted.concat(
            arrayA.slice().concat(arrayB.slice())
          );

          let resultMergeReturn = dataArray
            .slice(0, indexA)
            .concat(resultMergeArray)
            .concat(dataArrayCopy.slice(lengthTotal + indexA, 10));
          //   self.setState({
          //     resultArray: resultMergeReturn,
          //   });
          props.updateGraph(resultMergeReturn);

          await Promise.all([
            arrayA.forEach((element, index) => {
              changeSingleColor(element, 0);
            }),
            arrayB.forEach((element, index) => {
              changeSingleColor(element, 0);
            }),
            sorted.forEach((element, index) => {
              changeSingleColor(element, 0);
            }),
          ]);

          return resultMergeArray;
        } else {
          return;
        }
      }

      //   let dataArray = self.state.resultArray;
      let dataArray = [...props.resultArray];
      dataArray = await mergeSortAlgorithm(dataArray);

      //update all bar colors to green at end
      await Promise.all([
        dataArray.forEach((element, index) => {
          changeColors(index, 2);
        }),
      ]);
      //   self.setState({
      //     // onSort: false,
      //     buttonColor: '#fff',
      //   });
      props.setOnSort(false);
      props.setButtonColor('#fff');
    }
  };

  return (
    <div>
      <button
        onClick={startMergeSort}
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
        style={{ color: props.mergeColor }}
      >
        Merge Sort
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
  setMergeColor,
  //   setCityLocation,
  //   setStateLocation,
  //   setMessage,
  //   fetchJobData,
  setButtonColor,
})(MergeSort);

// export default BubbleSort;
