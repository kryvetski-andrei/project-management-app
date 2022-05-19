import React from 'react';
import Board from '../../components/Board';

const BoardPage = () => {
  return (
    <div>
      <Board />
    </div>
  );
};

export default BoardPage;
// import classes from './index.module.scss';
// import { useDispatch, useSelector } from 'react-redux';
// import { useTypedSelector } from '../../hooks/useTypeSelector';
//
// interface ITask {
//   id: number;
//   title: string;
// }
//
// interface IColum {
//   id: number;
//   title: string;
//   tasks: ITask[];
// }
//
// type DropZone = {
//   id: number;
// };
//
// type TaskList = ITask | DropZone;
//
// const isTask = (item: TaskList): item is TaskList => {
//   return 'title' in item;
// };
//
// const BoardPage = () => {
//   const dispatch = useDispatch();
//   const reduxBoards = useTypedSelector((state) => state);
//
//   const [currentTask, setCurrentTask] = useState<ITask | null>(null);
//   const [currentTaskSize, setCurrentTaskSize] = useState<number | null>(null);
//
//   const fillTasksWithDropZones = (tasks: ITask[]) => {
//     const dropZone = {
//       id: 0,
//     };
//     let id = dropZone.id;
//     return tasks.reduce(
//       (tasksWithDropZones, task) => {
//         tasksWithDropZones.push(task);
//         tasksWithDropZones.push({ id: (id += 1) });
//         return tasksWithDropZones;
//       },
//       [dropZone]
//     );
//   };
//
//   const reduxTakeTask = (e: React.DragEvent<HTMLDivElement>, column: IColum, task: ITask) => {
//     const target = e.target as HTMLElement;
//     setCurrentTask(task);
//     setCurrentTaskSize(target.offsetHeight);
//
//     setTimeout(() => {
//       const currentColumn = JSON.parse(JSON.stringify(column));
//       const currentIndex = column.tasks.indexOf(task);
//       currentColumn.tasks.splice(currentIndex, 1);
//       const boba = [...reduxBoards.columns].map((b) => (b.id === column!.id ? currentColumn! : b));
//
//       dispatch({
//         type: 'REMOVE_TASK_FROM_BOARD',
//         payload: boba,
//       });
//     });
//   };
//
//   const reduxDropHandler = (e: React.DragEvent<HTMLDivElement>, column: IColum, task: ITask) => {
//     e.preventDefault();
//     const dropZoneId = task.id;
//     const currentBoard = JSON.parse(JSON.stringify(column));
//     currentBoard.tasks.splice(dropZoneId, 0, currentTask!);
//     const boba = [...reduxBoards.columns].map((b) => (b.id === column.id ? currentBoard : b));
//     dispatch({
//       type: 'ADD_TASK_TO_BOARD',
//       payload: boba,
//     });
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
//
//   return (
//     <div className={classes.app}>
//       {reduxBoards.columns.map((column) => (
//         <div className={classes.board} key={column.id}>
//           <div className={classes.board__title}>
//             {column.title}
//             {fillTasksWithDropZones(column.tasks).map((task: DropZone | ITask, index) =>
//               isTask(task) ? (
//                 <div key={task.id}>
//                   <div
//                     className={classes.task}
//                     onDragStart={(e) => reduxTakeTask(e, column, task as ITask)}
//                     draggable={true}
//                   >
//                     {(task as ITask).title}
//                   </div>
//                 </div>
//               ) : (
//                 <div
//                   key={index + Date.now()}
//                   onDragOver={(e) => changeDropZoneSize(e)}
//                   onDragLeave={(e) => resetDropZoneSize(e)}
//                   onDrop={(e) => reduxDropHandler(e, column, task)}
//                   className={classes.dropZone}
//                 ></div>
//               )
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
//
// export default BoardPage;
