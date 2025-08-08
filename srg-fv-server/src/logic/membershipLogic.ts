import { getConnection } from './logicBase';
import { ShortMembership } from '../entities/shortmembership';
import { Membership } from '../entities/membership';
import { generateMembershipPdf } from '../helper/membershipPdfHelper';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { ApplyMembershipOptions } from '@srg-fv/srg-fv-contract/applyMembershipOptions';
import { ShortMembershipList } from '@srg-fv/srg-fv-contract/shortMembershipList';
import { MembershipPdf } from '@srg-fv/srg-fv-contract/membershipPdf';

const itemsPerPage = 15;

export async function addMembership(options: ApplyMembershipOptions) {
  const connection = getConnection();

  const sql = `
    insert into membership 
    (lastName,
    firstName,
    email,
    dateOfBirth,
    street,
    zip,
    city,
    memberSignature,
    isMemberNotAccountHolder,
    lastNameSepa,
    firstNameSepa,
    streetSepa,
    zipSepa,
    citySepa,
    bank, 
    bic, 
    iban, 
    mandate, 
    sepaSignature) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    options.lastName,
    options.firstName,
    options.email,
    options.dateOfBirth,
    options.street,
    options.zip,
    options.city,
    options.memberSignature,
    options.isMemberNotAccountHolder,
    options.lastNameSepa,
    options.firstNameSepa,
    options.streetSepa,
    options.zipSepa,
    options.citySepa,
    options.bank,
    options.bic,
    options.iban,
    options.mandate,
    options.sepaSignature,
  ];

  const [result] = await connection.execute<ResultSetHeader>(sql, values);

  const sql2 = `
    insert into membership_email
    (id, sent)
    VALUES
    (?, ?)
  `;

  const values2 = [result.insertId, false];

  await connection.execute(sql2, values2);
}

export async function getMemberships(
  page: number,
  search: string,
): Promise<ShortMembershipList> {
  const connection = getConnection();

  const sql = `
    SELECT id, lastName, firstName
    FROM membership
    WHERE ? or firstName like ? or lastName like ?
    ORDER BY lastName
    LIMIT ? OFFSET ?`;

  const offset = (page - 1) * itemsPerPage;

  const [rows] = await connection.execute<ShortMembership[]>(sql, [
    !search,
    `%${search}%`,
    `%${search}%`,
    itemsPerPage.toString(),
    offset.toString(),
  ]);

  const sql2 = `
    SELECT COUNT(*) as "count"
    FROM membership
    WHERE  ? or firstName like ? or lastName like ?
  `;

  const [rows2] = await connection.execute<RowDataPacket[]>(sql2, [
    !search,
    `%${search}%`,
    `%${search}%`,
  ]);

  return {
    memberships: rows,
    currentPage: page,
    maxPage: Math.ceil(rows2[0]['count'] / itemsPerPage),
  } as ShortMembershipList;
}

export async function getMembership(id: number): Promise<Membership> {
  const connection = getConnection();

  const sql = `
    SELECT *
    FROM membership
    WHERE id = ?`;

  const [rows] = await connection.execute<Membership[]>(sql, [id]);
  const membership = rows[0];

  return membership;
}

export async function getPdf(membership: Membership): Promise<MembershipPdf> {
  return generateMembershipPdf(membership);
}

export async function deleteMembership(id: number) {
  const connection = getConnection();

  const sql = `
    DELETE
    FROM membership
    WHERE id = ?`;

  await connection.execute(sql, [id]);

  return;
}
