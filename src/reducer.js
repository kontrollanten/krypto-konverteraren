import { combineReducers } from 'redux';
import ConvertCurrency from './containers/convert-currency/reducer';
import FileManager from './containers/file-manager/reducer';

export default combineReducers({
  FileManager,
  ConvertCurrency,
});
