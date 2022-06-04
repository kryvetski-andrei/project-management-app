import { useTypedSelector } from '../../hooks/useTypeSelector';
import { useActions } from '../../hooks/useActions';
import { useEffect } from 'react';
import { CircleLoading } from '../componentsUI/CircleLoading';
import { DragDropContext, Droppable, OnDragEndResponder } from 'react-beautiful-dnd';
import styled from '@emotion/styled';
import BeautifulColumn from './components/BeautifulColumn';
import { useDispatch } from 'react-redux';
import { BoardActionTypes } from '../../utils/types/Board';
import update from 'immutability-helper';
import ApiService from '../../utils/api/responses/board';
import AddColumnButton from './components/BeautifulColumn/AddColumnButton';

interface ContainerProps {
  isDraggingOver: boolean;
}

const BoardContainer = styled('div')<ContainerProps>`
  height: calc(100vh - 142px);
  box-sizing: border-box;
  display: flex;
  margin: 10px 0;
  background-color: ${(props) => (props.isDraggingOver ? '#639ee2' : 'inherit')};
`;

const BeautifulBoard = () => {
  const { columns, loading, error } = useTypedSelector((state) => state.board);
  const dispatch = useDispatch();
  const { fetchBoard } = useActions();

  useEffect(() => {
    fetchBoard(localStorage.getItem('idBoard')!);
  }, []);

  if (loading) {
    return <CircleLoading />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const onDragEnd: OnDragEndResponder = ({ destination, source, draggableId, type }) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = columns[columns.findIndex((column) => column.id === source.droppableId)];
    const end = columns[columns.findIndex((column) => column.id === destination.droppableId)];

    if (type === 'column') {
      const column = columns[columns.findIndex((column) => column.id === draggableId)];

      dispatch({
        type: BoardActionTypes.UPDATE_COLUMNS,
        payload: update(columns, {
          $splice: [
            [source.index, 1],
            [destination.index, 0, column],
          ],
        }),
      });

      ApiService.updateColumn(column, column.id, destination.index);

      return;
    }

    if (start === end) {
      const columnIndex = columns.findIndex((column) => column.id === source.droppableId);
      const column = columns[columns.findIndex((column) => column.id === source.droppableId)];
      const tasks = column.tasks;
      const task = tasks[tasks.findIndex((task) => task.id === draggableId)];

      ApiService.updateTask(task, column.id, destination.droppableId, destination.index);

      dispatch({
        type: BoardActionTypes.UPDATE_COLUMNS,
        payload: update(columns, {
          [columnIndex]: {
            tasks: {
              $splice: [
                [source.index, 1],
                [destination.index, 0, task],
              ],
            },
          },
        }),
      });
      return;
    }

    const sourceColumnIndex = columns.findIndex((column) => column.id === source.droppableId);
    const sourceColumn = columns[sourceColumnIndex];
    const destinationColumnIndex = columns.findIndex(
      (column) => column.id === destination.droppableId
    );
    const sourceTaskList = columns[sourceColumnIndex].tasks;
    const draggedTask = sourceTaskList[sourceTaskList.findIndex((task) => task.id === draggableId)];

    ApiService.updateTask(draggedTask, sourceColumn.id, destination.droppableId, destination.index);

    dispatch({
      type: BoardActionTypes.UPDATE_COLUMNS,
      payload: update(columns, {
        [sourceColumnIndex]: {
          tasks: { $splice: [[source.index, 1]] },
        },
        [destinationColumnIndex]: {
          tasks: { $splice: [[destination.index, 0, draggedTask]] },
        },
      }),
    });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-column" type="column" direction="horizontal">
          {(provided, snapshot) => (
            <BoardContainer
              isDraggingOver={snapshot.isDraggingOver}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((column, index) => {
                return (
                  <BeautifulColumn
                    index={index}
                    key={column.id}
                    column={column}
                    tasks={column.tasks}
                  />
                );
              })}
              {provided.placeholder}
              <AddColumnButton />
            </BoardContainer>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default BeautifulBoard;
