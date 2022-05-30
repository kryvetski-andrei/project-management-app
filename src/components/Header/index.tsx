import { AppBar, Box, Container, useScrollTrigger } from '@mui/material';
import { cloneElement, ReactElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { pagesPath } from '../../utils/config';
import BoardTools from './BoardTools';
import styles from './index.module.scss';
import LanguageMenu from './LanguagesMenu';
import Profile from './Profile';

const links = [
  { text: 'Sign up', path: pagesPath.signupPagePath },
  { text: 'Log in', path: pagesPath.loginPagePath },
];

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
  const location = useLocation();

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
                    Go to main
                  </NavLink>
                ) : (
                  ''
                )}
                <LanguageMenu dark={props.dark === 1} />
                <Profile />
              </>
            ) : (
              links.map(({ text, path }) => (
                <NavLink
                  className={({ isActive }) => {
                    return [isActive ? 'active' : '', styles['header__btn']].join(' ');
                  }}
                  key={text}
                  to={path}
                >
                  {text}
                </NavLink>
              ))
            )}
          </Box>
        </Box>
        {location.pathname === pagesPath.boardPagePath ? (
          <BoardTools
            btnClass={styles['header__btn']}
            dark={props.dark === 1}
            onCreateBoard={props.onCreateBoard}
          />
        ) : (
          ''
        )}
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
