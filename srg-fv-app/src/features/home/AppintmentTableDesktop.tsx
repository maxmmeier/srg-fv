import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { AddButton } from '../../shared/AddButton';
import TableBody from '@mui/material/TableBody';
import { DeleteButton } from '../../shared/DeleteButton';
import { useTranslation } from 'react-i18next';
import useKeycloak from '../../shared/useKeycloak';
import { Appointment } from '@srg-fv/srg-fv-contract/appointments';
import { Dispatch, SetStateAction } from 'react';

type Props = Readonly<{
  appointments: Appointment[];
  setOpenAdd: Dispatch<SetStateAction<boolean>>;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
  setDeleteAppointmentId: Dispatch<SetStateAction<number | null>>;
}>;

export function AppointmentTableDesktop({
  appointments,
  setOpenAdd,
  setOpenDelete,
  setDeleteAppointmentId,
}: Props) {
  const { t } = useTranslation();
  const { authenticated } = useKeycloak();

  return (
    <TableContainer sx={{ width: '100%' }}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='h6'>{t('date')}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h6'>{t('appointmentName')}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant='h6'>{t('location')}</Typography>
            </TableCell>
            {authenticated && (
              <TableCell align='right'>
                <AddButton setShow={setOpenAdd}></AddButton>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                {new Date(appointment.timestamp).toLocaleString('de-DE', {
                  weekday: 'short',
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </TableCell>
              <TableCell>{appointment.name}</TableCell>
              <TableCell>{appointment.location}</TableCell>
              {authenticated && (
                <TableCell align='right'>
                  <DeleteButton
                    id={appointment.id}
                    setDeleteId={setDeleteAppointmentId}
                    setShow={setOpenDelete}></DeleteButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
