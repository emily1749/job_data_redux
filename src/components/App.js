import React from 'react';
// import axios from 'axios';
import './index.css';

import { connect } from 'react-redux';
import {
  setOnSort,
  setBubbleColor,
  setQuickColor,
  setMergeColor,
  setCityLocation,
  setStateLocation,
  setMessage,
  fetchJobData,
  // setResultArray,
  setButtonColor,
} from '../actions';
import Loading from './Loading';
import BarGraph from './BarGraph';
import Controls from './Controls';
import InfoControls from './InfoControls';
import BubbleSort from './BubbleSort';
import MergeSort from './MergeSort';

class App extends React.Component {
  constructor() {
    super();
    this.updateGraph = this.updateGraph.bind(this);
    this.state = {
      // city: '',
      // state: '',
      resultArrayOriginal: [],
      resultArray: [],
      // bubbleColor: '',
      // quickColor: '',
      // mergeColor: '',
      // onSort: false,
      buttonColor: '',
      // loading: false,
      // locationSubmitted: false,
      initialData: false,
      // message: 'Please enter location',
      // error: false,
    };
  }

  resetSort = e => {
    let self = this;
    console.log('on sort reset');
    // if (this.state.onSort === false) {
    if (this.props.onSort === false && this.props.locationSubmitted === true) {
      const resultArrayCopy = [
        ['Typescript', 0.2, 0, 0, 0],
        ['Ruby', 1.52, 0, 0, 1],
        ['Python', 27.21, 0, 0, 2],
        ['C++', 22.84, 0, 0, 3],
        ['Golang', 0.4, 0, 0, 9],
        ['Swift', 2.34, 0, 0, 4],
        ['Javascript', 17.16, 0, 0, 5],
        ['PHP', 2.44, 0, 0, 6],
        ['Java', 17.56, 0, 0, 7],
        ['C#', 8.22, 0, 0, 8],
      ];
      // [...this.props.jobData];
      // JSON.parse(
      //   JSON.stringify(self.state.resultArrayOriginal)
      // );
      console.log(resultArrayCopy);
      self.setState({
        resultArray: resultArrayCopy,

        // bubbleColor: '',
        // quickColor: '',
        // mergeColor: '',
      });

      this.props.setBubbleColor('');
      this.props.setQuickColor('');
      this.props.setMergeColor('');
    }
  };

  onCityInputChange = e => {
    this.props.setCityLocation(e.target.value);

    // this.setState({
    //   [e.target.name]: e.target.value,
    // });
  };

  onStateInputChange = e => {
    this.props.setStateLocation(e.target.value);
    // this.setState({
    // [e.target.name]: e.target.value,
    // });
  };

  onSubmit = e => {
    let self = this;
    e.preventDefault();
    // var self = this;
    // if (this.state.onSort === false) {
    if (this.props.onSort === false) {
      // let resultArrayFetch = [];
      let city = this.props.cityLocation;
      let state = this.props.stateLocation;

      if (city && state) {
        console.log('in here');
        city = city.replace(' ', '+');
        // console.log("city: " + city + "State:" + state);
        this.props.setMergeColor('');
        this.props.setBubbleColor('');
        this.props.setQuickColor('');

        const fetchData = async () => {
          await this.props.fetchJobData(city, state);
          console.log('now');
        };
        fetchData();
        this.setState({
          resultArray: [
            ['Typescript', 0.2, 0, 0, 0],
            ['Ruby', 1.52, 0, 0, 1],
            ['Python', 27.21, 0, 0, 2],
            ['C++', 22.84, 0, 0, 3],
            ['Golang', 0.4, 0, 0, 9],
            ['Swift', 2.34, 0, 0, 4],
            ['Javascript', 17.16, 0, 0, 5],
            ['PHP', 2.44, 0, 0, 6],
            ['Java', 17.56, 0, 0, 7],
            ['C#', 8.22, 0, 0, 8],
          ],
        });
      }
    }
  };

  bubbleSort = () => {
    if (
      this.props.bubbleColor === '' &&
      // this.state.bubbleColor === '' &&
      this.props.quickColor === '' &&
      // this.state.quickColor === '' &&
      // this.state.mergeColor === '' &&
      this.props.mergeColor === '' &&
      this.props.onSort === false &&
      this.props.locationSubmitted === true
    ) {
      // this.setState({
      //   // bubbleColor: '#f08a5d',
      //   // onSort: true,
      //   buttonColor: '#00587a',
      // });
      this.props.setBubbleColor('#f08a5d');
      this.props.setOnSort(true);
      this.props.setButtonColor('#00587a');

      console.log('on bubblesort');

      let self = this;
      let count = 0;
      let round = 0;
      //flag indicates whether a bar has been swapped during this round

      let flag = true;
      let endFlag = false;

      let myInterval = setInterval(() => {
        // if (count === 0) {
        // }
        function swap(input, indexA, indexB) {
          flag = false;
          let temp = input[indexA];
          input[indexA] = input[indexB];
          input[indexB] = temp;
          return input;
        }

        if (endFlag === true || count === 9) {
          // let dataArray = self.state.resultArray;
          let dataArray = [...this.props.resultArray];
          if (dataArray[8][1] > dataArray[9][1]) {
            swap(dataArray, 8, 9);
            // self.setState({
            //   resultArray: dataArray,
            // });
          }

          if (round < 9) {
            dataArray[9 - round][3] = 2;
            dataArray[9 - round - 1][3] = 0;
          } else {
            dataArray[9 - round][3] = 2;
          }

          self.setState({
            resultArray: dataArray,
          });
          round++;
          //if at the end of the array and no swaps, all items are sorted
          if (flag === true) {
            let dataArray = self.state.resultArray;
            //Update each bar color to green
            dataArray.forEach(element => {
              element[3] = 2;
            });
            self.setState({
              resultArray: dataArray,
              // onSort: false,
              buttonColor: '#fff',
            });
            this.props.setOnSort(false);
            clearInterval(myInterval);
          } else {
            count = 0;
            flag = true;
          }
          endFlag = false;
          return;
        } else {
          let dataArray = self.state.resultArray;
          if (count === 0) {
            //if first count, have to color first two yellow
            dataArray[0][3] = 1;
            dataArray[1][3] = 1;
            self.setState({
              resultArray: dataArray,
            });
            count++;
          } else {
            if (dataArray[count - 1][1] > dataArray[count][1]) {
              swap(dataArray, count - 1, count);
              self.setState({
                resultArray: dataArray,
              });
            } else {
              if (dataArray[count + 1][3] !== 2) {
                //if the next one isn't green/already sorted, continue
                dataArray[count - 1][3] = 0;
                dataArray[count + 1][3] = 1;
                self.setState({
                  resultArray: dataArray,
                });
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

  // bubbleSort = () => {
  //   if (
  //     this.props.bubbleColor === '' &&
  //     // this.state.bubbleColor === '' &&
  //     this.props.quickColor === '' &&
  //     // this.state.quickColor === '' &&
  //     // this.state.mergeColor === '' &&
  //     this.props.mergeColor === '' &&
  //     this.props.onSort === false &&
  //     this.props.locationSubmitted === true
  //   ) {
  //     this.setState({
  //       // bubbleColor: '#f08a5d',
  //       // onSort: true,
  //       buttonColor: '#00587a',
  //     });
  //     this.props.setBubbleColor('#f08a5d');
  //     this.props.setOnSort(true);

  //     console.log('on bubblesort');

  //     let self = this;
  //     let count = 0;
  //     let round = 0;
  //     //flag indicates whether a bar has been swapped during this round

  //     let flag = true;
  //     let endFlag = false;

  //     let myInterval = setInterval(() => {
  //       if (count === 0) {
  //       }
  //       function swap(input, indexA, indexB) {
  //         flag = false;
  //         let temp = input[indexA];
  //         input[indexA] = input[indexB];
  //         input[indexB] = temp;
  //         return input;
  //       }

  //       if (endFlag === true || count === 9) {
  //         let dataArray = self.state.resultArray;
  //         if (dataArray[8][1] > dataArray[9][1]) {
  //           swap(dataArray, 8, 9);
  //           self.setState({
  //             resultArray: dataArray,
  //           });
  //         }

  //         if (round < 9) {
  //           dataArray[9 - round][3] = 2;
  //           dataArray[9 - round - 1][3] = 0;
  //         } else {
  //           dataArray[9 - round][3] = 2;
  //         }

  //         self.setState({
  //           resultArray: dataArray,
  //         });
  //         round++;
  //         //if at the end of the array and no swaps, all items are sorted
  //         if (flag === true) {
  //           let dataArray = self.state.resultArray;
  //           //Update each bar color to green
  //           dataArray.forEach(element => {
  //             element[3] = 2;
  //           });
  //           self.setState({
  //             resultArray: dataArray,
  //             // onSort: false,
  //             buttonColor: '#fff',
  //           });
  //           this.props.setOnSort(false);
  //           clearInterval(myInterval);
  //         } else {
  //           count = 0;
  //           flag = true;
  //         }
  //         endFlag = false;
  //         return;
  //       } else {
  //         let dataArray = self.state.resultArray;
  //         if (count === 0) {
  //           //if first count, have to color first two yellow
  //           dataArray[0][3] = 1;
  //           dataArray[1][3] = 1;
  //           self.setState({
  //             resultArray: dataArray,
  //           });
  //           count++;
  //         } else {
  //           if (dataArray[count - 1][1] > dataArray[count][1]) {
  //             swap(dataArray, count - 1, count);
  //             self.setState({
  //               resultArray: dataArray,
  //             });
  //           } else {
  //             if (dataArray[count + 1][3] !== 2) {
  //               //if the next one isn't green/already sorted, continue
  //               dataArray[count - 1][3] = 0;
  //               dataArray[count + 1][3] = 1;
  //               self.setState({
  //                 resultArray: dataArray,
  //               });
  //             } else if (dataArray[count + 1][3] === 2) {
  //               endFlag = true;
  //             }
  //             count++;
  //           }
  //         }
  //       }
  //     }, 140);
  //   }
  // };

  quickSort = async () => {
    if (
      this.props.bubbleColor === '' &&
      // this.state.bubbleColor === '' &&
      this.props.quickColor === '' &&
      // this.state.mergeColor === '' &&
      this.props.mergeColor === '' &&
      // this.state.onSort === false &&
      this.props.onSort === false &&
      this.props.locationSubmitted === true
    ) {
      this.setState({
        // quickColor: '#f08a5d',
        // onSort: true,
        buttonColor: '#00587a',
      });
      this.props.setQuickColor('#f08a5d');
      this.props.setOnSort(true);
      console.log('on quicksort');

      let self = this;

      //https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      async function swap(input, indexA, indexB) {
        await sleep(170);
        let temp = input[indexA];
        input[indexA] = input[indexB];
        input[indexB] = temp;

        return input;
      }

      //changeColors function, enter index to change color and number of color
      //updates state with the new bar colors
      async function changeColors(index, number) {
        let dataArray = self.state.resultArray;
        dataArray[index][3] = number;
        self.setState({
          resultArray: dataArray,
        });

        await sleep(170);
      }

      //resets the color of the bar to blue, updates state
      async function resetColor(endIndex) {
        let dataArray = self.state.resultArray;
        dataArray[endIndex][3] = 0;
        self.setState({
          resultArray: dataArray,
        });

        await sleep(0.1);
      }

      async function getPivotIndex(array, startIndex, endIndex) {
        let pivotValue = array[endIndex][1];

        let pivotIndex = startIndex;
        await changeColors(endIndex, 3);

        for (let i = startIndex; i < endIndex; i++) {
          let startPivotIndex = pivotIndex;

          //changes bar colors
          await Promise.all([changeColors(i, 2), changeColors(pivotIndex, 1)]);

          if (array[i][1] < pivotValue) {
            if (i === pivotIndex) {
              //if on first index, reset the color and increase pivot index

              await resetColor(i);
              pivotIndex++;
            } else {
              //change colors if not on the first index
              //change to red

              await Promise.all([
                changeColors(i, 4),
                changeColors(pivotIndex, 4),
              ]);
              await swap(array, i, pivotIndex);

              //after swap, update colors
              await Promise.all([
                changeColors(i, 2),
                changeColors(pivotIndex, 2),
              ]);

              //reset the colors after and increase pivot index
              await Promise.all([resetColor(i), resetColor(pivotIndex)]);
              pivotIndex++;
            }
          }

          //reset colors before returning pivot index
          if (startPivotIndex !== pivotIndex) {
            await Promise.all([resetColor(i), resetColor(pivotIndex)]);
          } else {
            await resetColor(i);
          }
        }

        if (pivotIndex !== endIndex) {
          await Promise.all([
            changeColors(pivotIndex, 4),
            changeColors(endIndex, 4),
          ]);
          await swap(array, pivotIndex, endIndex);
          await Promise.all([
            changeColors(pivotIndex, 4),
            changeColors(endIndex, 4),
          ]);
          await Promise.all([resetColor(pivotIndex), resetColor(endIndex)]);
        }

        //return the pivot index
        return pivotIndex;
      }

      async function quickSortAlgorithm(array, startingIndex, endingIndex) {
        if (startingIndex > endingIndex) {
          return;
        } else {
          let index = await getPivotIndex(array, startingIndex, endingIndex);

          await Promise.all([
            quickSortAlgorithm(array, startingIndex, index - 1),
            quickSortAlgorithm(array, index + 1, endingIndex),
          ]);
        }
      }

      let dataArray = this.state.resultArray;
      await quickSortAlgorithm(dataArray, 0, 9).then(async () => {
        //pause, and then change colors to green
        setTimeout(() => {
          dataArray.forEach((bar, barIndex) => {
            bar[3] = 2;
          });
          self.setState({
            resultArray: dataArray,
            // onSort: false,
            buttonColor: '#fff',
          });
          this.props.setOnSort(false);
        }, 170);
      });
    }
  };

  mergeSort = async () => {
    if (
      this.props.bubbleColor === '' &&
      // this.state.bubbleColor === '' &&
      // this.state.quickColor === '' &&
      this.props.quickColor === '' &&
      // this.state.mergeColor === '' &&
      this.props.mergeColor === '' &&
      // this.state.onSort === false &&
      this.props.onSort === false &&
      this.props.locationSubmitted === true
    ) {
      this.setState({
        // mergeColor: '#f08a5d',
        // onSort: true,
        buttonColor: '#00587a',
      });
      this.props.setOnSort(true);
      this.props.setMergeColor('#f08a5d');
      console.log('on mergesort');

      let self = this;

      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      async function changeColors(index, number) {
        let dataArray = self.state.resultArray;
        dataArray[index][3] = number;
        self.setState({
          resultArray: dataArray,
        });
        await sleep(170);
      }

      async function changeSingleColor(item, number) {
        let dataArray = self.state.resultArray;

        //find where the item is in dataArray
        let index = dataArray.indexOf(item);
        dataArray[index][3] = number;

        self.setState({
          resultArray: dataArray,
        });

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
          let dataArray = self.state.resultArray;
          let dataArrayCopy = dataArray;
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
            let dataArray = self.state.resultArray;
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

            self.setState({
              resultArray: resultMergeReturn,
            });

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
          self.setState({
            resultArray: resultMergeReturn,
          });

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

      let dataArray = self.state.resultArray;
      dataArray = await mergeSortAlgorithm(dataArray);

      //update all bar colors to green at end
      await Promise.all([
        dataArray.forEach((element, index) => {
          changeColors(index, 2);
        }),
      ]);
      self.setState({
        // onSort: false,
        buttonColor: '#fff',
      });
      this.props.setOnSort(false);
    }
  };

  updateGraph = arr => {
    console.log('Before' + this.state.resultArray);
    console.log('updategraph');
    this.setState({
      resultArray: arr,
    });

    console.log('after' + this.state.resultArray);
  };

  render() {
    console.log('RERENDERED');
    console.log(this.props.loading);
    const { city, state } = this.state;
    var self = this;
    return (
      <div className='container'>
        <div className='controls-container'>
          <div className='controls'>
            <InfoControls />

            <div>
              <div>
                <h2>Location</h2>
              </div>

              <form onSubmit={this.onSubmit}>
                <div className='location-container'>
                  <div>
                    <label>City:</label>

                    <input
                      type='text'
                      name='city'
                      className='input-text'
                      value={city}
                      onChange={this.onCityInputChange}
                    />
                  </div>

                  {/* <br /> */}
                  <div>
                    <label>State:</label>

                    <input
                      type='text'
                      name='state'
                      className='input-text'
                      value={state}
                      onChange={this.onStateInputChange}
                    />
                  </div>

                  <div>
                    <div className='buttonHolder'>
                      <button
                        className='btn'
                        style={{ color: this.state.buttonColor }}
                      >
                        Submit Location
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className='algorithms-container'>
              <div>
                <h2>Sorting Algorithm</h2>
              </div>
              <div>
                <button
                  onClick={self.bubbleSort}
                  className='sortingAlgorithm'
                  style={{ color: this.props.bubbleColor }}
                >
                  Bubble Sort
                </button>
                {/* <BubbleSort
                  updateGraph={this.updateGraph}
                  resultArray={this.state.resultArray}
                /> */}
              </div>

              <div>
                <button
                  onClick={self.quickSort}
                  className='sortingAlgorithm'
                  style={{ color: this.props.quickColor }}
                >
                  Quick Sort
                </button>
              </div>

              <div>
                {/* <MergeSort
                  updateGraph={this.updateGraph}
                  resultArray={this.state.resultArray}
                /> */}
                <button
                  onClick={self.mergeSort}
                  className='sortingAlgorithm'
                  style={{ color: this.props.mergeColor }}
                >
                  Merge Sort
                </button>
              </div>

              <div className='buttonHolder'>
                <button
                  className='btn'
                  style={{ color: this.state.buttonColor }}
                  onClick={self.resetSort}
                >
                  Reset Sort
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='barGraph-container'>
          {this.props.locationSubmitted === false ||
          this.props.error === true ||
          (this.state.initialData === true && this.state.loading === true) ? (
            <Loading
              loading={this.props.loading}
              message={this.props.message}
            />
          ) : (
            <BarGraph resultArray={this.props.resultArray} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    onSort: state.onSort,
    bubbleColor: state.bubbleColor,
    quickColor: state.quickColor,
    mergeColor: state.mergeColor,
    cityLocation: state.cityLocation,
    stateLocation: state.stateLocation,
    message: state.message,
    loading: state.jobData.loading,
    jobDataCopy: state.jobData.jobDataCopy,
    error: state.jobData.error,
    locationSubmitted: state.jobData.locationSubmitted,
    resultArray: state.jobData.resultArray,
  };
};
// ReactDOM.render(<App />, document.querySelector('#root'));

export default connect(mapStateToProps, {
  setOnSort,
  setBubbleColor,
  setMergeColor,
  setQuickColor,
  setCityLocation,
  setStateLocation,
  setMessage,
  fetchJobData,
  // setResultArray,
})(App);
