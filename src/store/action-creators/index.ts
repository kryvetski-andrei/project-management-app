import * as BoardActionCreators from './board';
import * as ColumnActionCreators from './column';
import * as BordListActionCreators from './main';
import * as DeleteBordActionCreators from './deleteBoard';
import * as SetBordActionCreators from './setBoard';

export default {
  ...BoardActionCreators,
  ...ColumnActionCreators,
  ...BordListActionCreators,
  ...DeleteBordActionCreators,
  ...SetBordActionCreators,
};
