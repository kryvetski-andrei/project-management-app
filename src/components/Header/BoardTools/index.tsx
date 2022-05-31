import { Box } from '@mui/material';
import { ReactElement } from 'react';
import SearchField from '../SearchField';
import { useTypedSelector } from '../../../hooks/useTypeSelector';

interface IBoardToolsProps {
  dark?: boolean;
  onCreateBoard?: () => void;
  btnClass: string;
}

function BoardTools(props: IBoardToolsProps): ReactElement {
  const { createBoardBtn } = useTypedSelector((state) => state.lang.phrases.global);
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
        {createBoardBtn}
      </button>
      {/*<Box sx={{ width: '30%', marginLeft: '.5rem' }}>*/}
      {/*  <SearchField dark={props.dark} />*/}
      {/*</Box>*/}
    </Box>
  );
}

export default BoardTools;
