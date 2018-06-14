import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import user from './user';
import config from './config';

const rootReducer = combineReducers({
  counter,
  user,
  config,
  routing
});

export default rootReducer;
