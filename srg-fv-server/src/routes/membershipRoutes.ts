import { Router } from 'express';
import {
  applyMembership,
  getMemberships,
  getPdf,
  deleteMembership,
} from '../controllers/membershipControllers';
import { getKeycloak } from './routeBase';
import { validateData } from '../middlewares/validationMiddleware';
import {
  applyMembershipOptionsSchema,
  getMembershipPdfOptionsSchema,
} from '../schemas/membershipSchemas';

const router = Router();
const keycloak = getKeycloak();

router.post(
  '/apply',
  validateData(applyMembershipOptionsSchema),
  applyMembership,
);

router.get('/', keycloak.protect(), getMemberships);

router.post(
  '/pdf',
  keycloak.protect(),
  validateData(getMembershipPdfOptionsSchema),
  getPdf,
);

router.delete('/:id', keycloak.protect(), deleteMembership);

export default router;
