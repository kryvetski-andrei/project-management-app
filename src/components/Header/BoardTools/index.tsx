import { Box } from '@mui/material';
import { ReactElement } from 'react';
import SearchField from '../SearchField';

interface IBoardToolsProps {
  dark?: boolean;
  onCreateBoard?: () => void;
  btnClass: string;
}

function BoardTools(props: IBoardToolsProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '.5rem',
      }}
    >
      <button className={props.btnClass} onClick={props.onCreateBoard}>
        Create board
      </button>
      <Box sx={{ width: '30%', marginLeft: '.5rem' }}>
        <SearchField dark={props.dark} />
      </Box>
    </Box>
  );
}

export default BoardTools;
