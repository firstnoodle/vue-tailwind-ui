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

    // FRONT PAGE
    doc.addSection({
        headers: { default: defaultHeader },
        footers: { default: defaultFooter },
        children: [ ...frontPage ]
    });

    doc.addSection({
        headers: { default: defaultHeader },
        footers: { default: defaultFooter },
        children: [
            new Paragraph({
                style: 'heading',
                text: 'Introduction to the audit'
            }),
            new Paragraph({ style: 'heading', text: '' }),
            new Paragraph({
                style: 'body',
                text: 'This document serves as the Audit Plan for the Audit of {unit.name}. The Audit Plan is used to give both the unit and the audit team an overview of the audit activities to be performed during the audit. More information on the objective, methodology and the compliance requirements of the audit is available in Appendix 1.',
            }),
            new Paragraph({
                style: 'heading',
                text: 'Unit representatives and main contacts for the audit',
                spacing: { before: 800 }
            }),
            new Paragraph({ style: 'heading', text: '' }),
            ...sourceTemplates.unitRepresentatives.render({
                head: { name: 'Maria Minare', initials: 'MMNR' },
                coordinator: { name: 'Claus Jensen', initials: 'CLJS', email: 'cljs@novonordisk.com' },
            }),
            new Paragraph({
                style: 'heading',
                text: 'Unit representatives and main contacts for the audit',
                spacing: { before: 800 }
            }),
            new Paragraph({ style: 'heading', text: '' }),
            ...sourceTemplates.auditTeam.render([
                { name: 'Susan Barnkopf', initials: 'SNBN', role: 'Lead Auditor' },
                { name: 'Vanya Daghat', initials: 'VYDT', role: 'Auditor' },
            ]),
        ]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Audit Plan.docx");
    });
};