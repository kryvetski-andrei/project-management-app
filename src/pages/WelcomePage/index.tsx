import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ReactElement } from 'react';
import DeveloperCard from '../../components/DeveloperCard';
import styles from './index.module.scss';

const presentationSrc = 'https://www.youtube.com/embed/lkFTPepvYVI';

const developers = [
  {
    image: '/images/ekaterina.jpg',
    name: 'Ekaterina',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    image: '/images/denis.jpg',
    name: 'Denis',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
  {
    image: '/images/andrei.jpg',
    name: 'Andrei',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
  },
];

const WelcomePage = (): ReactElement => {
  return (
    <Container maxWidth="md" sx={{ padding: '2rem 0' }}>
      <div className={styles['project-info']}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontFamily: 'Pavanam', marginBottom: '1.75rem' }}
        >
          Project Management App
        </Typography>
        <Typography align="center" sx={{ fontFamily: 'Pavanam', fontSize: '.875rem' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Dignissim enim sit amet venenatis urna cursus eget.
          Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Tincidunt
          augue interdum velit euismod. Varius sit amet mattis vulputate enim nulla aliquet
          porttitor. Id donec ultrices tincidunt arcu non sodales neque sodales. Aliquam nulla
          facilisi cras fermentum. Quam elementum pulvinar etiam non quam lacus suspendisse. Et
          egestas quis ipsum suspendisse ultrices gravida dictum. Elementum tempus egestas sed sed
          risus. Ultricies tristique nulla aliquet enim tortor at. Ut eu sem integer vitae justo
          eget magna fermentum. Vulputate eu scelerisque felis imperdiet proin fermentum leo. Eget
          gravida cum sociis natoque.
        </Typography>
      </div>
      <div className={styles['presentation']}>
        <Typography
          variant="h4"
          align="center"
          sx={{ fontFamily: 'Pavanam', marginBottom: '.875rem' }}
        >
          Video presentation
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
          Developers
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {developers.map((developer) => (
            <DeveloperCard {...developer} key={developer.name} />
          ))}
        </Box>
      </div>
    </Container>
  );
};

export default WelcomePage;
