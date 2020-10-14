import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from 'file-saver';

const FONT = 'apis';

export const exportRequirements = requirements => {

    const doc = new Document();

    const title = new Paragraph({
        // spacing: {
        //     before: 240,
        //     after: 120
        // },
        children: [
            new TextRun({
                bold: true,
                font: FONT,
                size: 44,
                text: 'Requirements',
            }),
            new TextRun({
                font: FONT,
                size: 22,
                text: '\n',
            })
        ]
    });

    doc.addSection({
        children: [
            title, 
            ...requirements.map(requirement => {
                return new Paragraph({
                    // bullet: { level: 0 },
                    children: [
                        new TextRun({
                            font: FONT,
                            text: requirement.description
                        })
                    ],
                });
            })
        ]
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "requirements.docx");
    });
}