import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Appointment } from '../../../../srg-fv-contract/appointments';
import axios from 'axios';
import useKeycloak from '../../shared/useKeycloak';
import { AddButton } from '../../shared/AddButton';
import { DeleteButton } from '../../shared/DeleteButton';
import { ConfirmationModal } from '../../shared/ConfirmationModal';
import { AddAppointmentModal } from './AddAppointmentModal';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

export function Appointments() {
  const { t } = useTranslation();
  const { authenticated, keycloak } = useKeycloak();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState<number | null>(
    null,
  );

  const config = {
    headers: {
      authorization: `Bearer ${keycloak?.token}`,
    },
  };

  const readAppointments = () => {
    axios.get(import.meta.env.VITE_BACKEND_URL + 'appointment').then((res) => {
      setAppointments(res.data as Appointment[]);
    });
  };

  useEffect(() => {
    readAppointments();
  }, []);

  return (
    <>
      <TableContainer sx={{ width: '100%' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>{t('date')}</TableCell>
              <TableCell>{t('appointmentName')}</TableCell>
              <TableCell>{t('location')}</TableCell>
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

      <ConfirmationModal
        open={openDelete}
        title={t('deleteAppointmentTitle', {
          name: `${appointments.find((a) => a.id == deleteAppointmentId)?.name}`,
        })}
        message={t('deleteAppointmentMessage', {
          name: `${appointments.find((a) => a.id == deleteAppointmentId)?.name}`,
        })}
        buttonText={t('delete')}
        handleClose={() => {
          setOpenDelete(false);
        }}
        handleConfirm={() => {
          setOpenDelete(false);
          axios
            .delete(
              import.meta.env.VITE_BACKEND_URL +
                'appointment/' +
                deleteAppointmentId,
              config,
            )
            .then(() => {
              setAppointments(
                appointments.filter((a) => a.id !== deleteAppointmentId),
              );
            });
        }}></ConfirmationModal>

      <AddAppointmentModal
        open={openAdd}
        handleClose={() => {
          setOpenAdd(false);
        }}
        handleConfirm={(body) => {
          setOpenAdd(false);
          axios({
            method: 'post',
            url: import.meta.env.VITE_BACKEND_URL + 'appointment/',
            headers: config.headers,
            data: body,
          }).then(() => {
            readAppointments();
          });
        }}></AddAppointmentModal>
    </>
  );
}
