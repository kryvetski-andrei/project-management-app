import { Container } from '@mui/material';
import classes from './index.module.scss';

interface EmptyBoardListProps {
  onClick(): void;
}

const EmptyBoardList = ({ onClick }: EmptyBoardListProps) => {
  return (
    <Container>
      <button className={classes.button} onClick={onClick}>
        Сreate your first board
      </button>
    </Container>
  );
};

export default EmptyBoardList;
