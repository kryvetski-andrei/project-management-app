import React from 'react';
import classes from './index.module.scss';
import BeautifulBoard from '../../components/BeautifulBoard';

const BoardPage = () => {
  return (
    <div className={classes.boardPage}>
      <BeautifulBoard />
      {/*<Board />*/}
    </div>
  );
};

export default BoardPage;
