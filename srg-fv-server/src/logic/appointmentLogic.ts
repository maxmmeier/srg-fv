import { AddAppointmentOptions } from '@srg-fv/srg-fv-contract/addAppointmentOptions';
import { Appointment } from '../entities/appointment';
import { getConnection } from './logicBase';

export async function addAppointment(options: AddAppointmentOptions) {
  const connection = getConnection();

  const sql = `
    insert into appointment 
    (timestamp,
    location,
    name) 
    VALUES 
    (?, ?, ?)`;

  const values = [options.timestamp, options.location, options.name];

  await connection.execute(sql, values);
}

export async function deleteAppointment(id: number) {
  const connection = getConnection();

  const sql = `
    DELETE
    FROM appointment
    WHERE id = ?`;

  const values = [id];

  await connection.execute(sql, values);
}

export async function getAppointments(): Promise<Appointment[]> {
  const connection = getConnection();

  const sql = `
    SELECT id, timestamp, location, name
    FROM appointment
    WHERE timestamp > CURRENT_TIMESTAMP()
    ORDER BY timestamp`;

  const [rows] = await connection.execute<Appointment[]>(sql, []);

  return rows;
}
