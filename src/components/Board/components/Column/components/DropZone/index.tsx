import React from 'react';
// import classes from './index.module.scss';
//
// const DropZone = () => {
//   const dropHandler = (e: React.DragEvent<HTMLDivElement>, board: Board, item: Item) => {
//     e.preventDefault();
//     const dropZoneId = item.id;
//     board.items.splice(dropZoneId, 0, currentItem!);
//     setBoards(
//         boards.map((b) => {
//           if (b.id === board.id) return board;
//           return b;
//         })
//     );
//   };
//
//   const changeDropZoneSize = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const target = e.target as HTMLElement;
//     target.style.height = `${currentTaskSize}px`;
//     target.style.background = 'green';
//   };
//
//   const resetDropZoneSize = (e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const target = e.target as HTMLElement;
//     target.style.height = `20px`;
//     target.style.background = 'lightpink';
//   };
//   return (
//       <div
//           key={index + Date.now()}
//           onDragOver={(e) => changeDropZoneSize(e)}
//           onDragLeave={(e) => resetDropZoneSize(e)}
//           onDrop={(e) => dropHandler(e, board, item)}
//           className={classes.DropZone}
//       ></div>
//   )
// }
//
// export default DropZone;
