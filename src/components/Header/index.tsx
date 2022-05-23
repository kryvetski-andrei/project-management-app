import { AppBar, Box, Container, useScrollTrigger } from '@mui/material';
import { cloneElement, ReactElement } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { pagesPath } from '../../utils/config';
import styles from './index.module.scss';
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
    elevation: 1,
    position: 'sticky',
    className: [styles.header, trigger ? styles['header_scroll'] : styles['header_top']].join(' '),
  });
}

function Header(): ReactElement {
  const location = useLocation();
  console.log(location);

  return (
    <ElevationScroll>
      <AppBar>
        <Container
          maxWidth="xl"
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
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {links.map(({ text, path }) => (
              <NavLink
                className={({ isActive }) => {
                  return [isActive ? 'active' : '', styles['header__link']].join(' ');
                }}
                key={text}
                to={path}
              >
                {text}
              </NavLink>
            ))}
            {/* <Profile /> */}
          </Box>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}

export default Header;
