import { FunctionComponent } from 'react';
import classes from './index.module.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import React from 'react';
import styled from '@emotion/styled';
import Task from './components/BeautifulTask';
import { IColumn } from '../../../../utils/types/Column';
import { ITask } from '../../../../utils/types/Task';

interface columnPropsType {
  column: IColumn;
  tasks: ITask[];
  index: number;
}

const Container = styled('div')`
  margin: 8px;
  border-radius: 2px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  width: 230px;
  background: white;
`;
const Title = styled('h3')`
  padding: 8px;
`;

interface TaskListProps {
  isDraggingOver: boolean;
}

const TaskList = styled('div')<TaskListProps>`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
  transition: background-color ease 0.2s;
  background-color: ${(props) => (props.isDraggingOver ? 'palevioletred' : 'white')};
`;
const BeautifulColumn: FunctionComponent<columnPropsType> = ({ tasks, column, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Title>{column.title}</Title>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default BeautifulColumn;

// export const BeautifulColumn: FunctionComponent<columnPropsType> = ({column, tasks, index,}) => {
//   return <div className={classes.beautiful_column}>{column.title}</div>;
// };
