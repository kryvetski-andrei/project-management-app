import { AppBar, Box, Container, useScrollTrigger } from '@mui/material';
import { cloneElement, ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { pagesPath } from '../../utils/config';
import CreateBoard from '../CreateBoard';
import BoardTools from './BoardTools';
import styles from './index.module.scss';
import LanguageMenu from './LanguagesMenu';
import Profile from './Profile';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    dark: trigger ? 1 : 0,
  });
}

function Header(props: { dark?: number; onCreateBoard?: () => void }): ReactElement {
  const token = useTypedSelector((state) => state.auth.token);
  const { login, signUp } = useTypedSelector((state) => state.lang.phrases.global);
  const { toMain } = useTypedSelector((state) => state.lang.phrases.header);
  const location = useLocation();
  const dispatch = useDispatch();
  const { activeModal } = useTypedSelector((state) => state.main);
  const [, setDisable] = useState<boolean>(true);
  const handleCloseModal = () => {
    dispatch({
      type: 'SET_OPEN_MODAL',
    });
    setDisable(true);
  };

  const handleClik = () => {
    handleCloseModal();
    dispatch({
      type: 'SET_ACTIVE_MODAL',
      payload: 'create',
    });
  };

  return (
    <AppBar
      elevation={1}
      position="sticky"
      className={[styles.header, props.dark ? styles['header_scroll'] : styles['header_top']].join(
        ' '
      )}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '.5rem',
          }}
        >
          <NavLink to="/welcome" className={styles['header__logo']}>
            PWA
          </NavLink>
          <Box
            sx={{
              display: 'flex',
              minWidth: '10rem',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {token != null ? (
              <>
                {location.pathname !== pagesPath.mainPagePath ? (
                  <NavLink
                    className={({ isActive }) => {
                      return [isActive ? 'active' : '', styles['header__btn']].join(' ');
                    }}
                    key="go to main"
                    to="/"
                  >
                    {toMain}
                  </NavLink>
                ) : (
                  ''
                )}
                <LanguageMenu dark={props.dark === 1} />
                <Profile />
              </>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) => {
                    return [isActive ? 'active' : '', styles['header__btn']].join(' ');
                  }}
                  to={pagesPath.signupPagePath}
                >
                  {signUp}
                </NavLink>
                <NavLink
                  className={({ isActive }) => {
                    return [isActive ? 'active' : '', styles['header__btn']].join(' ');
                  }}
                  to={pagesPath.loginPagePath}
                >
                  {login}
                </NavLink>
              </>
            )}
          </Box>
        </Box>
        {location.pathname === pagesPath.mainPagePath ? (
          <BoardTools
            btnClass={styles['header__btn']}
            dark={props.dark === 1}
            onCreateBoard={handleClik}
          />
        ) : (
          ''
        )}
        {activeModal === 'create' && <CreateBoard />}
      </Container>
    </AppBar>
  );
}

function ScrolledHeader(props: { onCreateBoard?: () => void }) {
  return (
    <ElevationScroll>
      <Header onCreateBoard={props.onCreateBoard} />
    </ElevationScroll>
  );
}

export default ScrolledHeader;
