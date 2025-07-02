import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export function BoardCard({
  imageName,
  name,
  role,
  club,
}: {
  imageName: string;
  name: string;
  role: string;
  club: string;
}) {
  return (
    <Card sx={{ width: '20%' }}>
      <CardMedia sx={{ height: 140 }} image={'src/assets/' + imageName} />
      <CardContent>
        <Typography variant='h5'>{name}</Typography>
        <Typography variant='body1' sx={{ marginBottom: 2 }}>
          {role}
        </Typography>
        <Typography variant='body2'>{club}</Typography>
      </CardContent>
    </Card>
  );
}
