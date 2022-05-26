import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from './index.module.scss';
import { FormEvent, ReactElement, useState } from 'react';

interface ISearchField {
  onSearch: (value: string) => void;
}

function SearchField(props: ISearchField): ReactElement {
  const [searchValue, setSearchValue] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    props.onSearch(searchValue);
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
          backgroundColor: '#F4F4F4',
          borderRadius: '.7rem',
        }}
      >
        <InputBase
          placeholder="Search…"
          inputProps={{
            'aria-label': 'search',
            sx: { padding: 0, fontSize: '.75rem', fontFamily: 'Poppins' },
          }}
          value={searchValue}
          onChange={onChange}
        />
        <div className={styles['search-field__icon-wrapper']}>
          <SearchIcon color="action" />
        </div>
      </Box>
    </form>
  );
}

export default SearchField;
