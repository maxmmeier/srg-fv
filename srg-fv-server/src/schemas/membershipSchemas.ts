import { z } from 'zod';

export const applyMembershipOptionsSchema = z.object({
  lastName: z.string(),
  firstName: z.string(),
  email: z.string().email(),
  dateOfBirth: z.string(),
  street: z.string(),
  zip: z.string(),
  city: z.string(),
  memberSignature: z.string(),
  isMemberNotAccountHolder: z.boolean(),
  lastNameSepa: z.string().optional().nullable(),
  firstNameSepa: z.string().optional().nullable(),
  streetSepa: z.string().optional().nullable(),
  zipSepa: z.string().optional().nullable(),
  citySepa: z.string().optional().nullable(),
  bank: z.string(),
  bic: z.string(),
  iban: z.string(),
  mandate: z.string(),
  sepaSignature: z.string(),
});

export const getMembershipPdfOptionsSchema = z.object({
  id: z.number(),
});
