import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { pagesPath } from '../../utils/config';
import WelcomePage from '../../pages/WelcomePage';
import MainPage from '../../pages/MainPage';
import RegistrationPage from '../../pages/RegistrationPage';
import ErrorPage from '../../pages/ErrorPage';
import BoardPage from '../../pages/BoardPage';
import EditProfilePage from '../../pages/EditProfilePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={pagesPath.welcomeUsPagePath} element={<WelcomePage />} />
      <Route path={pagesPath.mainPagePath} element={<MainPage />} />
      <Route path={pagesPath.boardPagePath} element={<BoardPage />} />
      <Route path={pagesPath.registrationPagePath} element={<RegistrationPage />} />
      <Route path={pagesPath.editProfilePagePath} element={<EditProfilePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
