import React from 'react';
import Board from '../../components/Board';
import './index.module.scss';
import BeautifulBoard from '../../components/BeautifulBoard';

const BoardPage = () => {
  return (
    <div className="board-page">
      <BeautifulBoard />
      {/*<Board />*/}
    </div>
  );
};

export default BoardPage;
