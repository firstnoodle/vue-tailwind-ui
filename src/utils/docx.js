import { Document, Packer, Paragraph } from "docx";
import { saveAs } from 'file-saver';

const FONT = 'apis';

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
                    // bullet: { level: 0 },
                    style: "body",
                    text: requirement.description
                });
            })
        ]
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "requirements.docx");
    });
}

const styles = {
    paragraphStyles: [
        {
            id: "heading",
            name: "heading",
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
            id: "body",
            name: "body",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                font: FONT,
                size: 22,
            },
            paragraph: {},
        },
    ]
};