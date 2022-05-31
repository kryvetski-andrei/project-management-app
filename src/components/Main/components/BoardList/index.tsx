import { Box, IconButton, Paper, Stack, styled, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import classes from './index.module.scss';
import { useEffect } from 'react';
import EmptyBoardList from '../../../EmptyBoardList';
import { useTypedSelector } from '../../../../hooks/useTypeSelector';
import { useActions } from '../../../../hooks/useActions';
import { useDispatch } from 'react-redux';
import MyLinkButton from '../LinkButton';
import Preloader from '../../../Preloader';
interface BoardListProps {
  createBoard(): void;
}

const BoardList = ({ createBoard }: BoardListProps) => {
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
  const { boards, isFetching } = useTypedSelector((state) => state.main);
  const { getBoards } = useActions();
  const dispatch = useDispatch();

  useEffect(() => {
    getBoards();
  }, []);

  const handleClick = (e: React.UIEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    dispatch({
      type: 'SET_ID_BOARD',
      payload: id,
    });
    dispatch({
      type: 'SET_OPEN_MODAL',
    });
    dispatch({
      type: 'SET_ACTIVE_MODAL',
      payload: 'delete',
    });
  };
  return (
    <>
      {boards ? (
        <>
          <h2 className={classes.title}>Board List</h2>
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
                  <MyLinkButton id={id} />
                </Box>
              </Board>
            ))}
          </Stack>
          <button className={classes.button} onClick={createBoard}>
            Create new board
          </button>
        </>
      ) : (
        <EmptyBoardList onClick={createBoard} />
      )}
      {isFetching && <Preloader open={isFetching} />}
    </>
  );
};

export default BoardList;
