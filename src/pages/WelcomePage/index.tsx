import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement } from 'react';
import DeveloperCard from '../../components/DeveloperCard';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import styles from './index.module.scss';

const presentationSrc = 'https://www.youtube.com/embed/lkFTPepvYVI';

const WelcomePage = (): ReactElement => {
  const phrases = useTypedSelector((state) => state.lang.phrases.welcome);

  return (
    <Container maxWidth="md" sx={{ padding: '2rem 0' }}>
      <div className={styles['project-info']}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontFamily: 'Pavanam', marginBottom: '1.75rem' }}
        >
          {phrases.pma}
        </Typography>
        <Typography align="center" sx={{ fontFamily: 'Pavanam', fontSize: '.875rem' }}>
          {phrases.pmaDesc}
        </Typography>
      </div>
      <div className={styles['presentation']}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontFamily: 'Pavanam', marginBottom: '.875rem' }}
        >
          {phrases.presentation}
        </Typography>
        <div className={styles['presentation__video']}>
          <iframe
            width="100%"
            height="100%"
            src={presentationSrc}
            title="Presentation video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </div>
      <div>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontFamily: 'Pavanam', marginBottom: '1.688rem' }}
        >
          {phrases.developers}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <DeveloperCard
            image="/images/ekaterina.jpg"
            name={phrases.developersInfo[0].name}
            description={phrases.developersInfo[0].desc}
          />
          <DeveloperCard
            image="/images/denis.jpg"
            name={phrases.developersInfo[1].name}
            description={phrases.developersInfo[1].desc}
          />
          <DeveloperCard
            image="/images/andrei.jpg"
            name={phrases.developersInfo[2].name}
            description={phrases.developersInfo[2].desc}
          />
        </Box>
      </div>
    </Container>
  );
};

export default WelcomePage;
