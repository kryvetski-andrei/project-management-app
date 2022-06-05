import React, { FunctionComponent, useState } from 'react';
import { TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import ApiService from '../../../../../../utils/api/responses/board';
import { findColumnById } from '../../../../../Board/utils/findColumnById';
import { useTypedSelector } from '../../../../../../hooks/useTypeSelector';
import { useDispatch } from 'react-redux';
import { BoardActionTypes } from '../../../../../../utils/types/Board';
import update from 'immutability-helper';
import styled from '@emotion/styled';

interface TitleInputProps {
  columnId: string;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  titleValue: string;
}

const TitleInputContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  padding: 5px;
`;

const TitleInput: FunctionComponent<TitleInputProps> = ({
  editMode,
  setEditMode,
  titleValue,
  columnId,
}) => {
  const [loading, setLoading] = useState(false);
  const [titleInputValue, setTitleInputValue] = useState(titleValue);
  const { columns } = useTypedSelector((state) => state.board);
  const dispatch = useDispatch();

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInputValue(event.target.value);
  };

  const { index } = findColumnById(columns, columnId);

  const handleClick = async () => {
    setLoading(true);
    await ApiService.updateColumn(titleInputValue, columnId, index);
    setLoading(false);
    dispatch({
      type: BoardActionTypes.UPDATE_COLUMNS,
      payload: update(columns, {
        [index]: { title: { $set: titleInputValue } },
      }),
    });
    setEditMode(false);
  };

  return (
    <TitleInputContainer>
      <TextField
        id="standard-basic"
        label="Title"
        variant="standard"
        onChange={changeHandler}
        value={titleInputValue}
        sx={{ maxWidth: '145px' }}
        autoComplete={'off'}
      />
      <LoadingButton
        color="secondary"
        onClick={handleClick}
        loading={loading}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
      >
        Save
      </LoadingButton>
    </TitleInputContainer>
  );
};

export default TitleInput;
