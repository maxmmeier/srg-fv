import { Router } from 'express';
import {
  getAppointments,
  deleteAppointment,
  addAppointment,
} from '../controllers/appointmentControllers';
import { getKeycloak } from './routeBase';
import { validateData } from '../middlewares/validationMiddleware';
import { addAppointmentOptionsSchema } from '../schemas/appointmentSchemas';

const router = Router();
const keycloak = getKeycloak();

router.get('/', getAppointments);

router.post(
  '/',
  keycloak.protect(),
  validateData(addAppointmentOptionsSchema),
  addAppointment,
);

router.delete('/:id', keycloak.protect(), deleteAppointment);

export default router;
