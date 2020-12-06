import { combineReducers } from 'redux';
import fetchJobDataReducer from './fetchJobDataReducer';

export default combineReducers({
  jobData: fetchJobDataReducer,
});
