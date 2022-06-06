import React from 'react';
import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';
import { ITask } from '../../../../../../utils/types/Task';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import TaskMenu from './components/TaskMenu';

interface ContainerProps {
  isDragging: boolean;
}

interface TaskType {
  columnId: string;
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

const Task = ({ columnId, task, index }: TaskType) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography gutterBottom variant="h6" component="div">
              {task.title}
            </Typography>
            <TaskMenu taskId={task.id} columnId={columnId} />
          </Box>
          <Typography variant="body2" color="text.secondary">
            {task.description}
          </Typography>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
