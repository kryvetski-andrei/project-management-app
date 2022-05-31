import { ArrowRightAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyLinkButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlerClick = () => {
    navigate('/board');
    dispatch({
      type: 'SET_ID_BOARD',
      payload: id,
    });
  };
  return (
    <IconButton onClick={handlerClick}>
      <ArrowRightAlt />
    </IconButton>
  );
};

export default MyLinkButton;
