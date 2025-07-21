import { MembershipEmail } from '../entities/membershipEmail';
import { getConnection } from './logicBase';

export async function getAllMembershipsWithUnsetEmails(): Promise<
  MembershipEmail[]
> {
  const connection = getConnection();

  const sql = `
    SELECT id, sent
    FROM membership_email
    WHERE sent = 0
    ORDER BY id
    LIMIT 5
  `;

  const [rows] = await connection.execute<MembershipEmail[]>(sql);

  return rows;
}

export async function confirmEmailSent(id: number): Promise<void> {
  const connection = getConnection();

  const sql = `
    UPDATE membership_email
    SET sent = 1
    WHERE id = ?
  `;

  const values = [id];

  await connection.execute(sql, values);
}
