import { ColumnActionTypes, IColumnAction, IColumnState } from '../../utils/types/Column';

const defaultState: IColumnState = {
  columns: [],
  loading: false,
  error: null,
};

export const columnReducer = (state = defaultState, action: IColumnAction): IColumnState => {
  switch (action.type) {
    case ColumnActionTypes.FETCH_COLUMN:
      return { ...state, columns: [], loading: true, error: null };
    case ColumnActionTypes.FETCH_COLUMN_SUCCESS:
      return { ...state, columns: [...state.columns, action.payload], loading: false, error: null };
    case ColumnActionTypes.FETCH_COLUMN_ERROR:
      return { ...state, columns: [], loading: false, error: action.payload };
    default:
      return state;
  }
};
