import {
  ILanguage,
  ILanguageAction,
  ILanguageState,
  LanguageActionTypes,
  LanguageName,
  LANG_STORAGE_NAME,
} from '../../utils/types/languages';

const ruLanguage: ILanguage = {
  global: {
    signUp: 'Зарегистрироваться',
    login: 'Войти',
    createBoardBtn: 'Создать доску',
    modalCreateBordTitle: 'Создать доску',
    buttonCancel: 'Отменить',
    buttonAgree: 'Создать',
  },
  welcome: {
    pma: 'Приложение для управления проектами',
    pmaDesc: 'Информация...',
    presentation: 'Видео презентация',
    developersInfo: [
      {
        name: 'Екатерина',
        desc: 'Информация ...',
      },
      {
        name: 'Денис',
        desc: 'Информация ...',
      },
      {
        name: 'Андрей',
        desc: 'Информация ...',
      },
    ],
    developers: 'Разработчики',
  },
  header: {
    toMain: 'На главную',
    editProfile: 'Изменить профиль',
    signOut: 'Выйти',
  },
  login: {
    registrText: 'Нет аккаунта? Регистрация',
  },
  main: {
    boardList: 'Список досок',
    modalDeleteBordTitle: 'Удалить доску',
    modalDeleteBordContent: 'Вы уверены, что хотите удалить доску?',
    buttonAgreeDelete: 'Удалить',
  },
};

const engLanguage: ILanguage = {
  global: {
    signUp: 'Sign Up',
    login: 'Log in',
    createBoardBtn: 'Create a board',
    modalCreateBordTitle: 'Создать доску',
    buttonCancel: 'Cancel',
    buttonAgree: 'Create',
  },
  welcome: {
    pma: 'Project Management App',
    presentation: 'Video presentation',
    pmaDesc: 'Information...',
    developersInfo: [
      {
        name: 'Ekaterina',
        desc: 'Information...',
      },
      {
        name: 'Denis',
        desc: 'Information...',
      },
      {
        name: 'Andrew',
        desc: 'Information...',
      },
    ],
    developers: 'Developers',
  },
  header: {
    toMain: 'Go to main',
    editProfile: 'Edit profile',
    signOut: 'Sign out',
  },
  login: {
    registrText: "Don't have an account? Sign up",
  },
  main: {
    boardList: 'Board List',
    modalDeleteBordTitle: 'Delete a board',
    modalDeleteBordContent: 'Are you sure you want to delete the board?',
    buttonAgreeDelete: 'Delete',
  },
};

const defaultState: ILanguageState = {
  current: localStorage.getItem(LANG_STORAGE_NAME) || LanguageName.eng,
  phrases: localStorage.getItem(LANG_STORAGE_NAME) === LanguageName.ru ? ruLanguage : engLanguage,
};

export const langReducer = (state = defaultState, action: ILanguageAction): ILanguageState => {
  switch (action.type) {
    case LanguageActionTypes.SET_CURRENT:
      localStorage.setItem(LANG_STORAGE_NAME, action.payload);
      return {
        ...state,
        current: action.payload,
        phrases: action.payload === LanguageName.ru ? ruLanguage : engLanguage,
      };
    default:
      return state;
  }
};
