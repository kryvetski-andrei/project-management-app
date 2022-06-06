import { Avatar, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ReactElement } from 'react';

export interface IDeveloperCardProps {
  image: string;
  name: string;
  description: string;
}

function DeveloperCard(props: IDeveloperCardProps): ReactElement {
  return (
    <Card
      sx={{ padding: '.5rem', maxWidth: '15.625rem', backgroundColor: '#F4F4F4' }}
      elevation={0}
    >
      <CardMedia sx={{ display: 'flex', justifyContent: 'center' }}>
        <Avatar alt={props.name} src={props.image} sx={{ width: 200, height: 200 }} />
      </CardMedia>
      <CardContent sx={{ padding: '1.25rem' }}>
        <Typography
          align="center"
          sx={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '.813rem',
          }}
        >
          {props.name}
        </Typography>
        <Typography align="center" sx={{ fontSize: '.875rem' }}>
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DeveloperCard;
