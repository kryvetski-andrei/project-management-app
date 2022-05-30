import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './index.module.scss';
import { FormEvent, ReactElement, useState } from 'react';

interface ISearchField {
  onSearch?: (value: string) => void;
  dark?: boolean;
}

function SearchField(props: ISearchField): ReactElement {
  const [searchValue, setSearchValue] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (typeof props.onSearch === 'function') {
      props.onSearch(searchValue);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
    setSearchValue(e.currentTarget.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          display: 'flex',
          padding: '.438rem .5rem',
          backgroundColor: props.dark ? 'rgb(68,68,68)' : '#F4F4F4',
          borderRadius: '.7rem',
        }}
      >
        <InputBase
          placeholder="Search…"
          inputProps={{
            'aria-label': 'search',
          }}
          sx={{
            width: 'calc(100% - 24px)',
            padding: 0,
            fontSize: '.75rem',
            fontFamily: 'Poppins',
            color: props.dark ? 'white' : 'black',
          }}
          value={searchValue}
          onChange={onChange}
        />
        <div
          className={
            (styles['search-field__icon-wrapper'],
            styles[props.dark ? 'color_white' : 'color_black'])
          }
        >
          <SearchIcon color="inherit" />
        </div>
      </Box>
    </form>
  );
}

export default SearchField;
