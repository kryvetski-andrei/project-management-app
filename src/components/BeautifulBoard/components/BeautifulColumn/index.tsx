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
  randomBgGradient: string;
}

const ColumnContainer = styled('div')<ContainerProps>`
  background: linear-gradient(45deg, #fff1eb, #ace0f9);
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
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #fcfcfc;
  }

  &::-webkit-scrollbar {
    width: 3px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    background-color: #e8e8e8;
  }
`;

const BeautifulColumn: FunctionComponent<columnPropsType> = ({ tasks, column, index }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <ColumnContainer
          randomBgGradient={Math.floor(Math.random() * 16777215).toString(16)}
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
                  <Task key={task.id} columnId={column.id} task={task} index={index} />
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
