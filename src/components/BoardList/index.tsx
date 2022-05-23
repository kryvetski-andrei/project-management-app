import { ArrowRightAlt } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { colorsGenetator } from '../../utils/common/common';
import ClearIcon from '@mui/icons-material/Clear';
import classes from './index.module.scss';
import { BoardListProps } from '../../utils/types/BoardList/index';

const BoardList = ({ boards, onClick }: BoardListProps) => {
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
  return (
    <Stack spacing={2}>
      {boards.map(({ id, title }) => (
        <Board sx={{ backgroundColor: colorsGenetator() }} key={id}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {title}
            <IconButton onClick={onClick} id={id}>
              <ClearIcon />
            </IconButton>
          </Box>
          <Link to={'/board'} className={classes.link}>
            <ArrowRightAlt />
          </Link>
        </Board>
      ))}
    </Stack>
  );
};

export default BoardList;
