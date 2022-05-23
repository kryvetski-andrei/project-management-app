import { Container } from '@mui/material';
import { ReactElement } from 'react';
import LogInForm from '../../components/LogInForm';

function LogInPage(): ReactElement {
  return (
    <Container maxWidth="xs" sx={{ paddingTop: '5rem', height: 'calc(100vh - 8rem)' }}>
      <LogInForm />
    </Container>
  );
}

export default LogInPage;
