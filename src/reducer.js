import { combineReducers } from 'redux';
import Home from './containers/home/reducer';
import FileManager from './containers/file-manager/reducer';

export default combineReducers({
  FileManager,
  Home,
});
