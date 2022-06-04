import React from 'react';
import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from '../../../../../../utils/types/Task';

interface ContainerProps {
  isDragging: boolean;
}

interface TaskType {
  task: ITask;
  index: number;
}

const Container = styled('div')<ContainerProps>`
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  border-radius: 2px;
  padding: 8px;
  background: ${(props) => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Task = ({ task, index }: TaskType) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {task.title}
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
