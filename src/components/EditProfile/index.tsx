import { Button, Container, Stack, Typography } from '@mui/material';
import classes from './index.module.scss';
import { useEffect, useState } from 'react';
import ButtonWithPreloader from '../../components/ButtonWithPreloader';
import MessageHandler from '../../components/MessageHandler';
import Modal from '../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { editProfileSlice } from '../../store/reducers/editProfileReducer';
import { deleteUser, getUser, updateUser } from '../../utils/api/EditProfileFetch';
import { Errors, UserUpdate } from '../../utils/types/EditProfile';
import Field from './components/TextField';
import PasswordField from './components/PasswordField';
import Buttons from './components/Buttons';

const EditProfile = () => {
  const { user, userId, isLoading, status, error } = useAppSelector(
    (state) => state.editProfileReducer
  );
  const { setUserId } = editProfileSlice.actions;
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);
  const [errValidation, setErrValidation] = useState<Errors>({});

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    userId && dispatch(setUserId(userId));
    userId && dispatch(getUser(userId));
  }, []); //вынести в другой компонент, чтобы при загрузке сразу были данные

  const [values, setValues] = useState<UserUpdate>({
    name: user.name,
    login: user.login,
    password: '',
  });

  const handleChange = (prop: keyof UserUpdate) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrValidation({});
    setDisable(false);
    setValues({ ...values, [prop]: event.target.value });
  };

  const validateForm = () => {
    if (values.name === '') errValidation.name = 'Enter name';
    if (values.login === '') errValidation.login = 'Enter login';
    if (values.password === '') errValidation.password = 'Enter password';
    setErrValidation(errValidation);
    if (Object.values(errValidation)) setDisable(true);
    if (Object.values(values).every((i) => '' !== i)) updateUserData();
  };

  const updateUserData = () => {
    setOpen(true);
    dispatch(updateUser({ user: values, id: userId }));
  };

  const openModalConfirm = () => {
    setOpenModal(true);
  };

  const deleteProfile = async () => {
    setOpen(true);
    await dispatch(deleteUser(userId));
    setOpenModal(false);
  };
  return (
    <Container maxWidth="xs" className={classes.container}>
      <Typography variant="h5" className={classes.title}>
        Edit profile
      </Typography>
      <Stack
        alignItems="center"
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, maxWidth: '50ch', width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <Field
          error={!!errValidation?.name}
          helperText={errValidation?.name}
          id="name"
          label="Name"
          defaultValue={user.name}
          onChange={handleChange('name')}
        />
        <Field
          error={!!errValidation?.login}
          helperText={errValidation?.login}
          id="login"
          label="Login"
          defaultValue={values.login}
          onChange={handleChange('login')}
        />
        <PasswordField
          error={!!errValidation?.password}
          value={values.password}
          onChange={handleChange('password')}
          helperText={errValidation?.password}
        />
        <Buttons
          disable={disable}
          validateForm={validateForm}
          openModalConfirm={openModalConfirm}
        />
      </Stack>
      {openModal && (
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title={'You are about to delete your profile'}
          content={'This action cannot be undone. Are you sure you want to delete the profale?'}
          buttonCancel={<Button onClick={() => setOpenModal(false)}>Cancel</Button>}
          buttonAgree={
            <ButtonWithPreloader isLoading={isLoading} onClick={deleteProfile} content={'Delete'} />
          }
        />
      )}
      {error && <MessageHandler open={open} setClose={setOpen} severity="error" text={error} />}
      {status && <MessageHandler open={open} setClose={setOpen} severity="success" text={status} />}
    </Container>
  );
};

export default EditProfile;
