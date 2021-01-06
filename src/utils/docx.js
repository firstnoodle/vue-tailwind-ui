import { Document, Packer, Paragraph } from "docx";
import { saveAs } from 'file-saver';

const FONT = 'apis';

export const exportPlan = () => {
    const doc = new Document({ 
        title: 'Audit Plan',
        styles 
    });

    // front page
    doc.addSection({
        children: [
            new Paragraph({
                style: 'documentTitle',
                text: 'ISO/GMP AUDIT PLAN'
            }),
            new Paragraph({
                style: 'heading',
                text: 'Routine audit of'
            }),
            new Paragraph({
                style: 'body',
                text: 'testing'
            }),
        ]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "Audit Plan.docx");
    });
};

export const exportRequirements = requirements => {

    const doc = new Document({ styles });

    const title = new Paragraph({
        style: "heading",
        text: "Requirements",
    });
    
    const newLine = new Paragraph({ style: "body" });

    doc.addSection({
        children: [
            title, 
            newLine,
            ...requirements.map(requirement => {
                return new Paragraph({
                    style: "body",
                    text: requirement.description
                });
            })
        ]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "requirements.docx");
    });
}

const styles = {
    paragraphStyles: [
        {
            id: "documentTitle",
            name: "documentTitle",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                bold: true,
                font: FONT,
                size: 44,
            },
            paragraph: {},
        },
        {
            id: "heading",
            name: "heading",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                bold: true,
                font: FONT,
                size: 24,
            },
            paragraph: {},
        },
        {
            id: "body",
            name: "body",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                font: FONT,
                size: 20,
            },
            paragraph: {},
        },
    ]
};