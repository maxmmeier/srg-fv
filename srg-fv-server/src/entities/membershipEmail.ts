import { RowDataPacket } from 'mysql2';

export interface MembershipEmail extends RowDataPacket {
  id: number;
  sent: boolean;
}
