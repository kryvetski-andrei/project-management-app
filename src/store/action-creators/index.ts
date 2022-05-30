import * as BoardActionCreators from './board';
import * as ColumnActionCreators from './column';

export default {
  ...BoardActionCreators,
  ...ColumnActionCreators,
};
