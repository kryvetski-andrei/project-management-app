import { Routes, Route } from 'react-router-dom';
import { pagesPath } from '../../utils/config';
import WelcomePage from '../../pages/WelcomePage';
import MainPage from '../../pages/MainPage';
import ErrorPage from '../../pages/ErrorPage';
import BoardPage from '../../pages/BoardPage';
import SignUpPage from '../../pages/SignUpPage';
import LogInPage from '../../pages/LogInPage';
import RequireAuth from './RequireAuth';
import EditProfilePage from '../../pages/EditProfile';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={pagesPath.welcomeUsPagePath} element={<WelcomePage />} />
      <Route
        path={pagesPath.mainPagePath}
        element={
          <RequireAuth redirect="/welcome">
            <MainPage />
          </RequireAuth>
        }
      />
      <Route
        path={pagesPath.editProfilePath}
        element={
          <RequireAuth redirect="/login">
            <EditProfilePage />
          </RequireAuth>
        }
      />
      <Route
        path={pagesPath.boardPagePath}
        element={
          <RequireAuth redirect="/login">
            <BoardPage />
          </RequireAuth>
        }
      />
      <Route path={pagesPath.loginPagePath} element={<LogInPage />} />
      <Route path={pagesPath.signupPagePath} element={<SignUpPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
