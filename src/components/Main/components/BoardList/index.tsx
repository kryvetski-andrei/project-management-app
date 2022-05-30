import { ArrowRightAlt } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import classes from './index.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/useAppDispatch';
import { mainSlice } from '../../../../store/reducers/mainReducers';
import { useEffect } from 'react';
import { getBoards } from '../../../../utils/api/mainPageFetch/mainPageFetch';
import EmptyBoardList from '../../../EmptyBoardList';
interface BoardListProps {
  isFetching: boolean;
  createBoard(): void;
}

const BoardList = ({ isFetching, createBoard }: BoardListProps) => {
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

  useEffect(() => {
    dispatch(getBoards());
  }, [isFetching]);

  const handleClick = (e: React.UIEvent<HTMLButtonElement>) => {
    dispatch(setOpenModal());
    dispatch(setActiveModal('delete'));
    const id = e.currentTarget.id;
    dispatch(setIdBoard(id));
  };

  return (
    <>
      {boards ? (
        <Stack spacing={2} sx={{ position: 'relative' }}>
          {boards.map(({ id, title, description }) => (
            <Board className={classes.board} key={id}>
              <Box className={classes.box}>
                {title}
                <IconButton onClick={handleClick} id={id}>
                  <ClearIcon />
                </IconButton>
              </Box>
              <Box className={classes.box}>
                <Typography sx={{ color: '#4f4e4e' }}>{description}</Typography>
                <Link to={'/board'} className={classes.link}>
                  <ArrowRightAlt />
                </Link>
              </Box>
            </Board>
          ))}
        </Stack>
      ) : (
        <EmptyBoardList onClick={createBoard} />
      )}
    </>
  );
};

export default BoardList;
