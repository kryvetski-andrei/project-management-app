import React, { useEffect, useState } from 'react';
import classes from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTypedSelector } from '../../hooks/useTypeSelector';

type Item = { id: number; title: string };

type Board = {
  id: number;
  title: string;
  items: Item[];
};

type DropZone = {
  id: number;
};

type TaskList = Item | DropZone;

const isTask = (item: TaskList): item is TaskList => {
  return 'title' in item;
};

const BoardPage = () => {
  const dispatch = useDispatch();
  const reduxBoards = useTypedSelector((state) => state);

  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'Сделать',
      items: [
        { id: 1, title: 'Пойти в магаз' },
        { id: 2, title: 'сыграть в доту' },
        { id: 3, title: 'Победить' },
      ],
    },
    {
      id: 2,
      title: 'Проверить',
      items: [
        { id: 4, title: 'холодильник' },
        { id: 5, title: 'мусор' },
        { id: 6, title: 'коммнуалку' },
      ],
    },
    {
      id: 3,
      title: 'Сделано',
      items: [
        { id: 7, title: 'поспать' },
        { id: 8, title: 'поесть' },
        { id: 9, title: 'Покурить' },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentTaskSize, setCurrentTaskSize] = useState<number | null>(null);

  const fillTasksWithDropZones = (tasks: Item[]) => {
    const dropZone = {
      id: 0,
    };
    let id = dropZone.id;
    return tasks.reduce(
      (tasksWithDropZones, task) => {
        tasksWithDropZones.push(task);
        tasksWithDropZones.push({ id: (id += 1) });
        return tasksWithDropZones;
      },
      [dropZone]
    );
  };

  const takeTask = (e: React.DragEvent<HTMLDivElement>, board: Board, item: Item) => {
    const target = e.target as HTMLElement;
    setCurrentBoard(board);
    setCurrentItem(item);
    setCurrentTaskSize(target.offsetHeight);

    setTimeout(() => {
      const currentIndex = board!.items.indexOf(item);
      board!.items.splice(currentIndex, 1);
      setBoards(boards.map((b) => (b.id === board!.id ? board! : b)));
    });
  };

  const reduxTakeTask = (e: React.DragEvent<HTMLDivElement>, board: Board, item: Item) => {
    const target = e.target as HTMLElement;
    setCurrentBoard(board);
    setCurrentItem(item);
    setCurrentTaskSize(target.offsetHeight);

    console.log('redux task henler works');
    setTimeout(() => {
      const currentBoardd = JSON.parse(JSON.stringify(board));
      const currentIndex = board.items.indexOf(item);
      console.log(currentBoardd, 'current board');
      console.log(item, 'current item');
      console.log(currentIndex, 'current index');
      currentBoardd.items.splice(currentIndex, 1);
      const boba = [...reduxBoards.boards].map((b) => (b.id === board!.id ? currentBoardd! : b));
      // setBoards(boards.map((b) => (b.id === board!.id ? board! : b)));
      console.log(boba, 'boba');
      dispatch({
        type: 'REMOVE_TASK_FROM_BOARD',
        update: boba,
      });
    });
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, board: Board, item: Item) => {
    e.preventDefault();
    const dropZoneId = item.id;
    board.items.splice(dropZoneId, 0, currentItem!);
    setBoards(boards.map((b) => (b.id === board.id ? board : b)));
  };

  const reduxDropHandler = (e: React.DragEvent<HTMLDivElement>, board: Board, item: Item) => {
    e.preventDefault();
    const dropZoneId = item.id;
    const currentBoard = JSON.parse(JSON.stringify(board));
    currentBoard.items.splice(dropZoneId, 0, currentItem!);
    const boba = [...reduxBoards.boards].map((b) => (b.id === board.id ? currentBoard : b));
    dispatch({
      type: 'ADD_TASK_TO_BOARD',
      update: boba,
    });
  };

  const changeDropZoneSize = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    target.style.height = `${currentTaskSize}px`;
    target.style.background = 'green';
  };

  const resetDropZoneSize = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    target.style.height = `20px`;
    target.style.background = 'lightpink';
  };

  return (
    <div className={classes.app}>
      {reduxBoards.boards.map((board) => (
        <div className={classes.board} key={board.id}>
          <div className={classes.board__title}>
            {board.title}
            {fillTasksWithDropZones(board.items).map((item: DropZone | Item, index) =>
              isTask(item) ? (
                <div key={item.id}>
                  <div
                    className={classes.item}
                    onDragStart={(e) => reduxTakeTask(e, board, item as Item)}
                    draggable={true}
                  >
                    {(item as Item).title}
                  </div>
                </div>
              ) : (
                <div
                  key={index + Date.now()}
                  onDragOver={(e) => changeDropZoneSize(e)}
                  onDragLeave={(e) => resetDropZoneSize(e)}
                  onDrop={(e) => reduxDropHandler(e, board, item)}
                  className={classes.dropZone}
                ></div>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardPage;
