import { MembershipPdf } from '../../../srg-fv-contract/membershipPdf';
import { Membership } from '../entities/membership';
import nodemailer from 'nodemailer';
import { promisify } from 'util';
import fs from 'fs';

const readFileAsync = promisify(fs.readFile);

function getTransporter() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: parseInt(process.env.EMAIL_PORT ?? '0'),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}

export async function sendEmail(membership: Membership, pdf: MembershipPdf) {
  const transporter = getTransporter();
  const htmlTemplate = await readFileAsync(
    './src/assets/emailTemplate.html',
    'utf-8',
  );
  const imageAttachment = await readFileAsync('./src/assets/full_logo.png');

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: membership.email,
    subject: 'Deine Beitritserklärung zum Förderverein ist angekommen!',
    html: htmlTemplate
      .replace('{{Recipient}}', membership.firstName)
      .replace(
        '{{title}}',
        'Beitritserklärung zum Förderverein der SRG Stuttgart',
      ),
    attachments: [
      {
        filename: pdf.fileName,
        content: pdf.base64,
        encoding: 'base64',
      },
      {
        filename: 'fv-logo.png',
        content: imageAttachment,
        encoding: 'base64',
        cid: 'uniqueImageCID',
      },
    ],
  });

  return info.accepted.length > 0;
}
