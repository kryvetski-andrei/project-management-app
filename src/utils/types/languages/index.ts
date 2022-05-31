export const LANG_STORAGE_NAME = 'lang';

export interface ILanguagePhrases {
  [name: string]: string;
}

interface IGlobalPhrases {
  login: string;
  signUp: string;
}

interface IWelcomePhrases {
  pma: string;
  pmaDesc: string;
  presentation: string;
  developers: string;
  developersInfo: ILanguagePhrases[];
}

interface IHeaderPhrases {
  toMain: string;
  editProfile: string;
  signOut: string;
}

interface ILoginPhrases {
  registrText: string;
}

export interface ILanguage {
  global: IGlobalPhrases;
  welcome: IWelcomePhrases;
  header: IHeaderPhrases;
  login: ILoginPhrases;
}

export interface ILanguageState {
  current: string | null;
  phrases: ILanguage;
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
