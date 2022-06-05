import { FunctionComponent, useState } from 'react';
import classes from './index.module.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import React from 'react';
import styled from '@emotion/styled';
import Task from './components/BeautifulTask';
import { IColumn } from '../../../../utils/types/Column';
import { ITask } from '../../../../utils/types/Task';
import ColumnMenu from './components/Menu';
import { TextField } from '@mui/material';
import TitleInput from './components/TitleInput';

interface columnPropsType {
  column: IColumn;
  tasks: ITask[];
  index: number;
}

const ColumnHeader = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ContainerProps {
  isDragging: boolean;
}

const ColumnContainer = styled('div')<ContainerProps>`
  background-color: white;
  border-radius: 5px;
  margin: 0 5px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  box-shadow: ${(props) => (props.isDragging ? 'rgba(0, 0, 0, 0.15) 0px 5px 15px' : 'none')};
`;
const Title = styled('h3')`
  padding: 8px;
`;

interface TaskListProps {
  isDraggingOver: boolean;
}

const TaskList = styled('div')<TaskListProps>`
  padding: 5px;
  flex-grow: 1;
  width: 100%;
  min-height: 100px;
  transition: background-color ease 0.2s;
  background-color: ${(props) => (props.isDraggingOver ? '#f0f4ff' : 'white')};
`;
const BeautifulColumn: FunctionComponent<columnPropsType> = ({ tasks, column, index }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <ColumnContainer
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ColumnHeader>
            {editMode ? (
              <TitleInput
                editMode={editMode}
                setEditMode={setEditMode}
                titleValue={column.title}
                columnId={column.id}
              />
            ) : (
              <Title>{column.title}</Title>
            )}
            <ColumnMenu columnId={column.id} setEditMode={setEditMode} editMode={editMode} />
          </ColumnHeader>
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
        </ColumnContainer>
      )}
    </Draggable>
  );
};

export default BeautifulColumn;
