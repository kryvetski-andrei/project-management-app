import { Container, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement } from 'react';
import DeveloperCard from '../../components/DeveloperCard';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import styles from './index.module.scss';

const presentationSrc = 'https://www.youtube.com/embed/lkFTPepvYVI';

const WelcomePage = (): ReactElement => {
  const phrases = useTypedSelector((state) => state.lang.phrases.welcome);

  return (
    <Container maxWidth="md" sx={{ padding: '2rem 0', minHeight: 'calc(100vh - 122px)' }}>
      <div className={styles['project-info']}>
        <Typography variant="h3" align="center" sx={{ marginBottom: '1.75rem' }}>
          {phrases.pma}
        </Typography>
        <Typography align="center" sx={{ fontSize: '.875rem' }}>
          {phrases.pmaDesc}
        </Typography>
      </div>
      <div>
        <Typography variant="h4" align="center" sx={{ marginBottom: '1.688rem' }}>
          {phrases.developers}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Link href="http://github.com/kate0305">
            <DeveloperCard
              image="/images/ekaterina.jpg"
              name={phrases.developersInfo[0].name}
              description={phrases.developersInfo[0].desc}
            />
          </Link>
          <Link href="https://github.com/SavitskiDenis">
            <DeveloperCard
              image="/images/denis.jpg"
              name={phrases.developersInfo[1].name}
              description={phrases.developersInfo[1].desc}
            />
          </Link>
          <Link href="https://github.com/kryvetski-andrei">
            <DeveloperCard
              image="/images/andrei.jpg"
              name={phrases.developersInfo[2].name}
              description={phrases.developersInfo[2].desc}
            />
          </Link>
        </Box>
      </div>
    </Container>
  );
};

export default WelcomePage;
