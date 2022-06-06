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
    pmaDesc:
      'Канбан-доска — это гибкий инструмент управления проектами, предназначенный для визуализации работы, ограничения незавершенной работы и максимизации эффективности (или потока). Это может помочь как Agile- , так  и DevOps - командам навести порядок в своей повседневной работе. Канбан-доски используют карточки, столбцы и постоянное совершенствование, чтобы помочь командам, занимающимся технологиями и обслуживанием, выполнить нужный объем работы и выполнить ее!',
    presentation: 'Видео презентация',
    developersInfo: [
      {
        name: 'Екатерина',
        desc: 'Была ответсвенная за страницу досок и страницу, которая отображает 404, работа с сервером',
      },
      {
        name: 'Денис',
        desc: 'Был ответсвенный за шапку сайт, подвал сайта, регистрацию и работа с сервером',
      },
      {
        name: 'Андрей',
        desc: 'Был ответсвенный за канбан и размещение сервера в сети интернет, работа с клиентом',
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

  board: {
    createColumn: 'Создать колонку',
    addTask: 'Добавить задание',
    delete: 'Удалить',
    deleteThisTask: 'Удалить этот таск',
    deleteThisColumn: 'Удалить эту колонку',
    editTask: 'Изменить таск',
    confirmationText: 'Вы уверены, что хотите это сделать?',
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
    pmaDesc:
      'A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow). It can help both agile and DevOps teams establish order in their daily work. Kanban boards use cards, columns, and continuous improvement to help technology and service teams commit to the right amount of work, and get it done!',
    developersInfo: [
      {
        name: 'Ekaterina',
        desc: 'Was responsible for the boards page and the page that displays 404, working with the server',
      },
      {
        name: 'Denis',
        desc: 'There was a site responsible for the header, site footer, registration and work with the server',
      },
      {
        name: 'Andrew',
        desc: 'Was responsible for the kanban and server placement in the Internet',
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
  board: {
    createColumn: 'Create column',
    addTask: 'Add task',
    delete: 'Delete',
    deleteThisTask: 'Delete this task',
    deleteThisColumn: 'Delete this column',
    editTask: 'Edit task',
    confirmationText: 'If you understand the consequences...',
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
