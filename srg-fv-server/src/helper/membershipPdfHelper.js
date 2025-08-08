import PDFDocument from 'pdfkit';

export function generateMembershipPdf(membership) {
  const doc = new PDFDocument({ size: 'A4' });

  doc.image('./src/assets/full_logo.jpg', 370, 10, {
    align: 'right',
    height: 100,
  });

  doc.moveDown();
  doc.moveDown();
  doc.moveDown();

  doc
    .font('Helvetica-Bold')
    .fontSize(20)
    .text(
      'Beitrittserklärung zum Förderverein der Schiedsrichter-Gruppe Stuttgart e.V.',
      { align: 'center' },
    );

  doc.moveDown();

  doc
    .font('Helvetica')
    .fontSize(10)
    .text(
      'Hiermit erkläre ich meinen Beitritt zum Förderverein der Schiedsrichter-Gruppe Stuttgart e.V. Der Mitgliedsbeitrag beträgt 30,- EUR pro Jahr. Bei Minderjährigen ist die Unterschrift des/der Erziehungsberechtigen erforderlich.',
    );

  doc.moveDown();

  doc.table({
    rowStyles: {
      border: [0, 0, 0, 0],
    },
    columnStyles: ['50', '*', '5', '85', '*'],
    data: [
      [
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'Name:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.lastName,
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: '',
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'Vorname:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.firstName,
        },
      ],
      [
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'E-Mail:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.email,
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: '',
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'Geb.-Datum:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.dateOfBirth.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
        },
      ],
      [
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'Straße:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.street,
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: '',
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'PLZ, Ort:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.zip + ' ' + membership.city,
        },
      ],
    ],
  });

  doc.moveDown();

  doc.text(
    `Stuttgart, den ${membership.created.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })}`,
  );

  doc.image(membership.memberSignature, 80, 310, {
    height: 50,
    width: 440,
    align: 'left',
  });

  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();
  doc.moveDown();

  doc
    .font('Helvetica-Bold')
    .fontSize(20)
    .text('SEPA-Lastschriftmandat', { align: 'center' });

  doc.moveDown();

  doc
    .font('Helvetica')
    .fontSize(10)
    .text(
      'Ich ermächtige den Förderverein der Schiedsrichter-Gruppe Stuttgart e. V. den Mitgliedsbeitrag von meinem Konto mittels Lastschrift einzuziehen. Zugleich weise ich mein Kreditinstitut an, die von dem Förderverein der Schiedsrichter-Gruppe Stuttgart e. V. auf mein Konto gezogenen Lastschriften einzulösen.',
    );

  doc.moveDown();

  doc
    .font('Helvetica')
    .fontSize(8)
    .text(
      'Hinweis: Ich kann innerhalb von acht Wochen, beginnend mit dem Belastungsdatum, die Erstattung des belasteten Betrages verlangen. Es gelten dabei die mit meinem Kreditinstitut vereinbarten Bedingungen.',
    );

  doc.moveDown();

  doc
    .font('Helvetica-Bold')
    .fontSize(10)
    .text('Gläubiger-Identifikationsnummer: DE89ZZZ00001897918')
    .font('Helvetica');

  doc.moveDown();

  doc.table({
    rowStyles: {
      border: [0, 0, 0, 0],
    },
    columnStyles: ['50', '*', '5', '85', '*'],
    data: [
      [
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'Name:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.isMemberNotAccountHolder
            ? membership.lastNameSepa
            : membership.lastName,
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: '',
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'Vorname:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.isMemberNotAccountHolder
            ? membership.firstNameSepa
            : membership.firstName,
        },
      ],
      [
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'Straße:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.isMemberNotAccountHolder
            ? membership.streetSepa
            : membership.street,
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: '',
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'PLZ, Ort:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text:
            (membership.isMemberNotAccountHolder
              ? membership.zipSepa
              : membership.zip) +
            ' ' +
            (membership.isMemberNotAccountHolder
              ? membership.citySepa
              : membership.city),
        },
      ],
      [
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'Bank:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.bank,
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: '',
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'BIC:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.bic,
        },
      ],
      [
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'IBAN:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.iban,
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: '',
        },
        {
          padding: ['.5em', '.25em', 0, '.25em'],
          text: 'Mandatsreferenz:',
        },
        {
          border: [0, 0, 1, 0],
          borderColor: 'black',
          padding: ['.5em', '.25em', 0, '.25em'],
          text: membership.mandate,
        },
      ],
    ],
  });

  doc.moveDown();

  doc.text(
    `Stuttgart, den ${membership.created.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })}`,
  );

  doc.image(membership.sepaSignature, 80, 660, {
    height: 50,
    width: 440,
    align: 'left',
  });

  doc.end();

  const data = doc.read();

  return {
    id: membership.id,
    base64: data.toString('base64'),
    fileName: `${membership.firstName}_${membership.lastName}.pdf`,
  };
}
