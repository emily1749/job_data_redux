import { combineReducers } from 'redux';
import fetchJobDataReducer from './fetchJobDataReducer';
import onSortReducer from './onSortReducer';
import bubbleColorReducer from './bubbleColorReducer';
import quickColorReducer from './quickColorReducer';
import mergeColorReducer from './mergeColorReducer';
import locationSubmittedReducer from './locationSubmittedReducer';
import buttonColorReducer from './bubbleColorReducer';
import stateLocationReducer from './stateLocationReducer';
import cityLocationReducer from './cityLocationReducer';

export default combineReducers({
  jobData: fetchJobDataReducer,
  onSort: onSortReducer,
  bubbleColor: bubbleColorReducer,
  quickColor: quickColorReducer,
  mergeColor: mergeColorReducer,
  locationSubmitted: locationSubmittedReducer,
  buttonColor: buttonColorReducer,
  stateLocation: stateLocationReducer,
  cityLocation: cityLocationReducer,
});
