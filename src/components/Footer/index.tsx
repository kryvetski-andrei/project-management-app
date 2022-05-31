import { Avatar, Container, Link } from '@mui/material';
import { ReactElement } from 'react';
import styles from './index.module.scss';

const linkStyles = {
  color: 'white',
  cursor: 'pointer',
};

const linkImgStyles = {
  height: '1.5rem',
  width: 'auto',
};

function Footer(): ReactElement {
  return (
    <footer className={styles['footer']}>
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Link href="https://rs.school/react/" underline="none" sx={linkStyles}>
          <Avatar src="/images/rs_school.png" alt="rs school" variant="square" sx={linkImgStyles} />
        </Link>
        <Link underline="hover" sx={linkStyles}>
          2022
        </Link>
        <Link
          href="https://github.com/kryvetski-andrei/project-management-app"
          underline="none"
          sx={linkStyles}
        >
          <Avatar src="/images/github.png" alt="rs school" variant="square" sx={linkImgStyles} />
        </Link>
      </Container>
    </footer>
  );
}

export default Footer;
