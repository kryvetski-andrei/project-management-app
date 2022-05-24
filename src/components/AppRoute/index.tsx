import { Routes, Route } from 'react-router-dom';
import { pagesPath } from '../../utils/config';
import WelcomePage from '../../pages/WelcomePage';
import MainPage from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import BoardPage from '../../pages/BoardPage';
import SignUpPage from '../../pages/SignUpPage';
import LogInPage from '../../pages/LogInPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={pagesPath.welcomeUsPagePath} element={<WelcomePage />} />
      <Route path={pagesPath.mainPagePath} element={<MainPage />} />
      <Route path={pagesPath.borderPagePath} element={<BoardPage />} />
      <Route path={pagesPath.loginPagePath} element={<LogInPage />} />
      <Route path={pagesPath.signupPagePath} element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
