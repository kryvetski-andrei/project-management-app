import {
  ILanguageAction,
  ILanguageState,
  LanguageActionTypes,
  LanguageName,
  LANG_STORAGE_NAME,
} from '../../utils/types/languages';

const defaultState: ILanguageState = {
  current: localStorage.getItem(LANG_STORAGE_NAME) || LanguageName.eng,
};

export const langReducer = (state = defaultState, action: ILanguageAction): ILanguageState => {
  switch (action.type) {
    case LanguageActionTypes.SET_CURRENT:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};
