import { Container } from '@mui/material';
import { ReactElement } from 'react';
import SignUpForm from '../../components/SignUpForm';

function SignUpPage(): ReactElement {
  return (
    <Container maxWidth="xs" sx={{ paddingTop: '5rem', height: 'calc(100vh - 8rem)' }}>
      <SignUpForm />
    </Container>
  );
}

export default SignUpPage;
