import { AlignmentType, Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType } from "docx";
import { saveAs } from 'file-saver';

import styles from '../styles';
import { getHeader, getFooter } from './pageFurniture';
import frontPage from './frontPage';
import { sourceTemplates } from '../sources';


const blankLine = new Paragraph({ style: 'heading', text: '' });

const sectionTitle = (text, spaceBefore=null) => {
    const options = { style: 'heading', text };
    if(spaceBefore) options.spacing = { before: 800 };
    return new Paragraph(options);
};

const centeredTitle = text => {
    return new Paragraph({
        style: 'heading',
        alignment: AlignmentType.CENTER,
        text
    })
}

const paragraph = text => {
    return new Paragraph({ style: 'body', text });
};

export const exportPlan = () => {
    const defaultHeader = getHeader('AU100XXXX');
    const defaultFooter = getFooter();

    const doc = new Document({ 
        title: 'Audit Plan',
        styles 
    });

    // CHAPTER: Front page
    doc.addSection({
        headers: { default: defaultHeader },
        footers: { default: defaultFooter },
        children: [ ...frontPage ]
    });

    // CHAPTER: Main content
    doc.addSection({
        headers: { default: defaultHeader },
        footers: { default: defaultFooter },
        children: [

            // SECTION: Introduction
            sectionTitle('Introduction to the audit'),
            blankLine,
            paragraph('This document serves as the Audit Plan for the Audit of {unit.name}. The Audit Plan is used to give both the unit and the audit team an overview of the audit activities to be performed during the audit. More information on the objective, methodology and the compliance requirements of the audit is available in Appendix 1.'),

            // SECTION: Auditee / Unit contacts
            sectionTitle('Unit representatives and main contacts for the audit', true),
            blankLine,
            ...sourceTemplates.unitRepresentatives.render({
                head: { name: 'Maria Minare', initials: 'MMNR' },
                coordinator: { name: 'Claus Jensen', initials: 'CLJS', email: 'cljs@novonordisk.com' },
            }),

            // SECTION: Audit team
            sectionTitle('Audit team', true),
            blankLine,
            ...sourceTemplates.auditTeam.render([
                { name: 'Susan Barnkopf', initials: 'SNBN', role: 'Lead Auditor' },
                { name: 'Vanya Daghat', initials: 'VYDT', role: 'Auditor' },
            ]),

            // SECTION: Scope and focus areas
            sectionTitle('Audit scope and focus areas', true),
            blankLine,
            new Table({
                width: {
                    size: 2000,
                    type: WidthType.AUTO,
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'bodyBold', text: 'Scope' })],
                            }),
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'body', text: 'The audit covers the Quality Management System and ISO/GMP processes applicable for:' })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 25, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'bodyBold', text: 'Focus area(s)' })],
                            }),
                            new TableCell({
                                width: { size: 25, type: WidthType.AUTO },
                                children: [
                                    new Paragraph({ style: 'body', text: 'Aeseptic processes' }),
                                    new Paragraph({ style: 'body', text: 'Supply Chain Rybelsus' }),
                                    new Paragraph({ style: 'body', text: 'Validation' }),
                                    new Paragraph({ style: 'body', text: 'Deviation Handling' }),
                                    new Paragraph({ style: 'body', text: 'Change control' }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),

            // SECTION: General Quality System Elements
            sectionTitle('General quality system elements', true),
            blankLine,
            new Table({
                width: {
                    size: 2000,
                    type: WidthType.AUTO,
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'bodyBold', text: 'General department audit elements' })],
                            }),
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'body', text: 'Each department/area should be prepared to answer questions...' })],
                            }),
                        ],
                    }),
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'bodyBold', text: 'General process, functions, facility, and equipment audit elements' })],
                            }),
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'body', text: 'For processes, functions, facilities and equipment...' })],
                            }),
                        ],
                    })
                ]
            }),

            // SECTION: Information Requests
            sectionTitle('Information requests', true),
            blankLine,
            new Table({
                width: {
                    size: 2000,
                    type: WidthType.AUTO,
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'bodyBold', text: 'General department audit elements' })],
                            }),
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'body', text: 'Each department/area should be prepared to answer questions...' })],
                            }),
                        ],
                    }),
                ]
            }),

            // SECTION: Agenda
            sectionTitle('General overview of audit activities', true),
            blankLine,
            new Table({
                width: {
                    size: 2000,
                    type: WidthType.AUTO,
                },
                rows: [
                    new TableRow({
                        children: [
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'bodyBold', text: 'General department audit elements' })],
                            }),
                            new TableCell({
                                width: { size: 50, type: WidthType.AUTO },
                                children: [new Paragraph({ style: 'body', text: 'Each department/area should be prepared to answer questions...' })],
                            }),
                        ],
                    }),
                ]
            }),
        ]
    });

    // CHAPTER: Last page
    doc.addSection({
        headers: { default: defaultHeader },
        footers: { default: defaultFooter },
        children: [

            // SECTION: Distribution of audit report
            sectionTitle('Distribution of audit report'),
            paragraph('The audit report will be distributed no later than DD-MM-20YY'),

            // SECTION: Other information
            sectionTitle('Other information', true),
            paragraph('The Audit Plan may be modified before and during the audit.'),
            blankLine,
            paragraph('I am/We are looking forward to visiting your unit.'),
            blankLine,
            paragraph('Best regards'),
            paragraph('Name of Lead Auditor'),
            blankLine,
            paragraph('Date: DD-MM-20YY'),
        ]
    });

    // CHAPTER: Appendix 1
    doc.addSection({
        headers: { default: defaultHeader },
        footers: { default: defaultFooter },
        children: [

            // SECTION: Distribution of audit report
            centeredTitle('Appendix 1'),
            blankLine,
            sectionTitle('Objective'),
            paragraph('The objective of the audit is provide assurance...'),
            blankLine,
            sectionTitle('Methodology'),
            paragraph('The audit will be conducted in accordance with Novo Nordisk procedures...'),
            blankLine,
            paragraph('Management shall ensure...'),
            blankLine,
            sectionTitle('Compliance requirements'),
            paragraph('The objective of the audit performed is to provide assuranceregarding compliance'),
            blankLine,
            ...sourceTemplates.requirements.render([
                { description: 'Lorem ipsum 1 '},
                { description: 'Lorem ipsum 2 '},
                { description: 'Lorem ipsum 3 '},
                { description: 'Lorem ipsum 4 '},
                { description: 'Lorem ipsum 5 '},
            ])
        ]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Audit Plan.docx");
    });
};