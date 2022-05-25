import { ArrowRightAlt } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { colorsGenetator } from '../../utils/common/common';
import ClearIcon from '@mui/icons-material/Clear';
import classes from './index.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { mainSlice } from '../../store/reducers/mainReducers';

const BoardList = () => {
  const Board = styled(Paper)(({ theme }) => ({
    boxSizing: 'border-box',
    maxWidth: '1180px',
    height: '144px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px',
    boxShadow: 'none',
    ...theme.typography.h6,
    color: '#000000',
  }));
  const { boards } = useAppSelector((state) => state.mainReducer);
  const { setOpenModal, setActiveModal, setIdBoard } = mainSlice.actions;
  const dispatch = useAppDispatch();
  const handleClick = (e: React.UIEvent<HTMLButtonElement>) => {
    dispatch(setOpenModal());
    dispatch(setActiveModal('delete'));
    const id = e.currentTarget.id;
    dispatch(setIdBoard(id));
  };
  return (
    <Stack spacing={2}>
      {boards.map(({ id, title, description }) => (
        <Board sx={{ backgroundColor: colorsGenetator() }} key={id}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {title}
            <IconButton onClick={handleClick} id={id}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography>{description}</Typography>
            <Link to={'/board'} className={classes.link}>
              <ArrowRightAlt />
            </Link>
          </Box>
        </Board>
      ))}
    </Stack>
  );
};

export default BoardList;
