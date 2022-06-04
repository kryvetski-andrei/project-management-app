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

interface ContainerProps {
  isDraggingOver: boolean;
}

const Container = styled('div')<ContainerProps>`
  display: flex;
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
      const newColumns = [...columns];
      newColumns.splice(source.index, 1);
      newColumns.splice(
        destination.index,
        0,
        columns[columns.findIndex((column) => column.id === draggableId)]
      );

      dispatch({
        type: BoardActionTypes.UPDATE_COLUMNS,
        payload: newColumns,
      });

      return;
    }

    if (start === end) {
      const columnIndex = columns.findIndex((column) => column.id === source.droppableId);
      const columnN = columns[columns.findIndex((column) => column.id === source.droppableId)];
      const tasksN = columnN.tasks;

      dispatch({
        type: BoardActionTypes.UPDATE_COLUMNS,
        payload: update(columns, {
          [columnIndex]: {
            tasks: {
              $splice: [
                [source.index, 1],
                [destination.index, 0, tasksN[tasksN.findIndex((task) => task.id === draggableId)]],
              ],
            },
          },
        }),
      });
      return;
    }

    const sourceColumnIndex = columns.findIndex((column) => column.id === source.droppableId);
    const destinationColumnIndex = columns.findIndex(
      (column) => column.id === destination.droppableId
    );
    const sourceTaskList = columns[sourceColumnIndex].tasks;
    const draggedTask = sourceTaskList[sourceTaskList.findIndex((task) => task.id === draggableId)];

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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-column" type="column" direction="horizontal">
        {(provided, snapshot) => (
          <Container
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
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BeautifulBoard;
