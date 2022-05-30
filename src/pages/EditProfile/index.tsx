import { Container } from '@mui/material';
import { ReactElement } from 'react';
import EditProfileForm from '../../components/EditProfileForm';

function EditProfilePage(): ReactElement {
  return (
    <Container maxWidth="xs" sx={{ paddingTop: '5rem', height: 'calc(100vh - 7.6rem)' }}>
      <EditProfileForm />
    </Container>
  );
}

export default EditProfilePage;
