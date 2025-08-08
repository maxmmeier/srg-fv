import { Appointment } from '@srg-fv/srg-fv-contract/appointments';
import { Dispatch, SetStateAction } from 'react';
import { AppointmentTableDesktop } from './AppintmentTableDesktop';
import Box from '@mui/material/Box';
import { AppointmentTableSmartphone } from './AppintmentTableSmartphone';

type Props = Readonly<{
  appointments: Appointment[];
  setOpenAdd: Dispatch<SetStateAction<boolean>>;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
  setDeleteAppointmentId: Dispatch<SetStateAction<number | null>>;
}>;

export function AppointmentTable({
  appointments,
  setOpenAdd,
  setOpenDelete,
  setDeleteAppointmentId,
}: Props) {
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <AppointmentTableDesktop
          appointments={appointments}
          setOpenAdd={setOpenAdd}
          setOpenDelete={setOpenDelete}
          setDeleteAppointmentId={setDeleteAppointmentId}
        />
      </Box>

      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <AppointmentTableSmartphone appointments={appointments} />
      </Box>
    </>
  );
}
