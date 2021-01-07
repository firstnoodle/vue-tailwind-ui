import { Document, Packer, Paragraph } from "docx";
import { saveAs } from 'file-saver';
import styles from '../styles';
import { getHeader, getFooter } from './pageFurniture';
import frontPage from './frontPage';
import { sourceTemplates } from './structure';

export const exportPlan = () => {
    const defaultHeader = getHeader('AU100XXXX');
    const defaultFooter = getFooter();

    const doc = new Document({ 
        title: 'Audit Plan',
        styles 
    });

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
            ...sourceTemplates.auditTeam.render([
                { name: 'Susan Barnkopf', initials: 'SNBN', role: 'Lead Auditor' },
                { name: 'Vanya Daghat', initials: 'VYDT', role: 'Auditor' },
            ]),
            ...sourceTemplates.planRecipients.render([
                { name: 'Susan Barnkopf', initials: 'SNBN', copy: false },
                { name: 'Vanya Daghat', initials: 'VYDT', copy: false },
                { name: 'Sebastian Thielke', initials: 'NSTQ', copy: true },
            ]),
        ]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Audit Plan.docx");
    });
};