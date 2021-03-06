import { combineReducers } from 'redux';
import ConvertCurrency from './containers/convert-currency/reducer';
import CurrencySelector from './containers/currency-selector/reducer';
import FileManager from './containers/file-manager/reducer';
import FileValidator from './containers/file-validator/reducer';
import ParseRows from './containers/parse-rows/reducer';
import TransformCurrencyNames from './containers/transform-currency-names/reducer';

export default combineReducers({
  ConvertCurrency,
  CurrencySelector,
  FileManager,
  FileValidator,
  ParseRows,
  TransformCurrencyNames,
});
