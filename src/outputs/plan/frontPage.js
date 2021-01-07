import { Paragraph, TextRun } from "docx";

export default [
    // Title
    new Paragraph({
        style: 'documentTitle',
        text: 'ISO/GMP AUDIT PLAN',
        spacing: {
            before: 800,
            after: 800
        }
    }),

    // Unit
    new Paragraph({
        style: 'heading',
        text: 'Routine audit of'
    }),
    new Paragraph({
        style: 'heading',
        text: 'Name of unit'
    }),
    new Paragraph({
        style: 'heading',
        text: 'Site address'
    }),
    new Paragraph({
        style: 'heading',
        text: 'City/Country',
        spacing: {
            after: 400
        }
    }),

    // Border
    new Paragraph({
        border: {
            bottom: {
                color: 'auto',
                space: 1,
                value: 'single',
                size: 6
            }
        },
        spacing: {
            after: 400
        }
    }),

    // Recipients
    new Paragraph({
        style: 'bodyBold',
        text: 'Recipient(s):',
    }),
    new Paragraph({
        style: 'body',
        text: 'Name (Init.)',
    }),
    new Paragraph({
        style: 'bodyBold',
        text: 'Copy:',
    }),
    new Paragraph({
        style: 'body',
        text: 'Name (Init.)',
    }),

    new Paragraph({
        children: [
            new TextRun({ style: 'bodyBold', text: 'Audit date(s):\t\t'}),
            new TextRun({ style: 'body', text: 'DD-MM-20YY to DD-MM-20YY'}),
        ]
    })
];