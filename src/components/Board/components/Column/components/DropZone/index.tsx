import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import classes from './index.module.scss';
import { useDrop } from 'react-dnd';
const ItemTypes = {
  COLUMN: 'column',
  TASK: 'task',
};

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'lightcyan',
  cursor: 'move',
};

interface Item {
  columnId: string;
  id: string;
  originalIndex: number;
  height: number;
}

// function getStyle(height: number): CSSProperties {
//   return {
//     border: '1px dashed gray',
//     padding: '0.5rem 1rem',
//     backgroundColor: 'lightcyan',
//     cursor: 'move',
//     height: 20,
//   };
// }

// const style = {
//   border: '1px dashed gray',
//   padding: '0.5rem 1rem',
//   backgroundColor: 'lightcyan',
//   cursor: 'move',
//   height: 20,
// };

const DropZone = (props: { id: number }) => {
  const [height, setHeight] = useState(20);
  const { id } = props;

  const hoverDropZone = useCallback(
    (height: number) => {
      setHeight(height);
    },
    [height]
  );

  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.TASK,
      item: { id },
      hover({ id: currentTaskId, columnId: currentColumnId, height: H }: Item, monitor) {
        const currentTask = {
          columnId: currentColumnId,
          taskId: currentTaskId,
          taskHeight: H,
        };
        if (monitor.isOver()) {
          console.log(monitor.getInitialClientOffset(), 'monitor.getInitialClientOffset()');
          console.log(monitor.getClientOffset(), 'monitor.getClientOffset()');
        }
        setHeight(H);
      },

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver(),
      }),
    }),
    [height]
  );

  const useLeave = (callback: () => void, isOver: boolean) => {
    const ref = useRef(isOver);

    useEffect(() => {
      if (ref.current && !isOver) {
        callback();
      }

      ref.current = isOver;
    }, [isOver]);
  };

  useLeave(() => {
    setHeight(20);
  }, isOver);

  return <div ref={(node) => drop(node)} style={{ ...style, height }}></div>;
};

export default DropZone;
