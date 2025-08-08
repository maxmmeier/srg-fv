import { Appointment } from '@srg-fv/srg-fv-contract/appointments';
import Grid from '@mui/material/Grid';

type Props = Readonly<{
  appointments: Appointment[];
}>;

export function AppointmentTableSmartphone({ appointments }: Props) {
  return (
    <Grid container spacing={1}>
      {appointments.map((appointment) => (
        <>
          <Grid size={6}>
            {new Date(appointment.timestamp).toLocaleString('de-DE', {
              weekday: 'short',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Grid>
          <Grid size={6}>{appointment.name}</Grid>
          <Grid size={12} sx={{ marginBottom: 1 }}>
            {appointment.location}
          </Grid>
        </>
      ))}
    </Grid>
  );
}
