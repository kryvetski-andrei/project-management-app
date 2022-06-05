import React from 'react';
import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from '../../../../../../utils/types/Task';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

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
  max-width: 285px;
  border-radius: 2px;
  padding: 8px;
  background: white;
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
          <Typography gutterBottom variant="h6" component="div">
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
