export const LANG_STORAGE_NAME = 'lang';

export interface ILanguagePhrases {
  [name: string]: string;
}

interface IGlobalPhrases {
  login: string;
  signUp: string;
  createBoardBtn: string;
  modalCreateBordTitle: string;
  buttonCancel: string;
  buttonAgree: string;
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

interface IMainPhrases {
  boardList: string;
  modalDeleteBordTitle: string;
  modalDeleteBordContent: string;
  buttonAgreeDelete: string;
}

interface IBoardPhrases {
  createColumn: string;
  addTask: string;
  delete: string;
  deleteThisTask: string;
  deleteThisColumn: string;
  editTask: string;
  confirmationText: string;
}

export interface ILanguage {
  global: IGlobalPhrases;
  welcome: IWelcomePhrases;
  header: IHeaderPhrases;
  login: ILoginPhrases;
  main: IMainPhrases;
  board: IBoardPhrases;
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
