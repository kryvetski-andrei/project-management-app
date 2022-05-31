import * as BoardActionCreators from './board';
import * as ColumnActionCreators from './column';
import * as GetBordActionCreators from './getBoards';
import * as DeleteBordActionCreators from './deleteBoard';
import * as SetBordActionCreators from './setBoard';

export default {
  ...BoardActionCreators,
  ...ColumnActionCreators,
  ...GetBordActionCreators,
  ...DeleteBordActionCreators,
  ...SetBordActionCreators,
};
