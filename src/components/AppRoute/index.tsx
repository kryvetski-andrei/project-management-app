import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { pagesPath } from '../../utils/config';
import WelcomePage from '../../pages/WelcomePage';
import BorderPage from '../../pages/BorderPage';
import MainPage from '../../pages/MainPage';
import RegistrationPage from '../../pages/RegistrationPage';
import ErrorPage from '../../pages/ErrorPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={pagesPath.welcomeUsPagePath} element={<WelcomePage />} />
      <Route path={pagesPath.mainPagePath} element={<MainPage />} />
      <Route path={pagesPath.borderPagePath} element={<BorderPage />} />
      <Route path={pagesPath.registrationPagePath} element={<RegistrationPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
