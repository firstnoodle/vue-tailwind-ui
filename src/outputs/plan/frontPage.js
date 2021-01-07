import { Paragraph, TextRun } from "docx";
import { sourceTemplates } from '../sources';

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
        text: ''
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
            after: 800
        }
    }),

    // Recipients
    ...sourceTemplates.planRecipients.render([
        { name: 'Susan Barnkopf', initials: 'SNBN', copy: false },
        { name: 'Vanya Daghat', initials: 'VYDT', copy: false },
        { name: 'Sebastian Thielke', initials: 'NSTQ', copy: true },
    ]),
    new Paragraph({ style: 'body', text: '', spacing: { after: 3000 } }),

    new Paragraph({
        children: [
            new TextRun({ style: 'bodyBold', text: 'Audit date(s): '}),
            new TextRun({ style: 'body', text: 'DD-MM-20YY to DD-MM-20YY'}),
        ]
    })
];