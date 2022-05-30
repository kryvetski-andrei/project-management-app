export const LANG_STORAGE_NAME = 'lang';

export interface ILanguageState {
  current: string | null;
}

export enum LanguageActionTypes {
  SET_CURRENT = 'SET_CURRENT',
}

export enum LanguageName {
  ru = 'ru',
  eng = 'eng',
}

export const LANGUAGES_LIST = [LanguageName.ru, LanguageName.eng];

interface IActionUpdateSetCurrent {
  type: LanguageActionTypes.SET_CURRENT;
  payload: LanguageName;
}

export type ILanguageAction = IActionUpdateSetCurrent;
