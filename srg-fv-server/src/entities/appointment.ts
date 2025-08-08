import { RowDataPacket } from 'mysql2';

export interface Appointment extends RowDataPacket {
  id: number;
  timestamp: string;
  location: string;
  name: string;
}
