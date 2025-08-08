import { RowDataPacket } from 'mysql2';

export interface Membership extends RowDataPacket {
  id: number;
  lastName: string;
  firstName: string;
  email: string;
  dateOfBirth: string;
  street: string;
  zip: string;
  city: string;
  memberSignature: string;
  isMemberNotAccountHolder: boolean;
  lastNameSepa: string | undefined;
  firstNameSepa: string | undefined;
  streetSepa: string | undefined;
  zipSepa: string | undefined;
  citySepa: string | undefined;
  bank: string;
  bic: string;
  iban: string;
  mandate: string;
  sepaSignature: string;
  created: string;
}
