import { combineReducers, createStore } from 'redux';
import game from './gameReducer';

const rootReducer = combineReducers({ game });
export default createStore(rootReducer);
