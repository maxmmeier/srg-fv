import { RowDataPacket } from 'mysql2';

export interface ShortMembership extends RowDataPacket {
  id: number;
  lastName: string;
  firstName: string;
}
