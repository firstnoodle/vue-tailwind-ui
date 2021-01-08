import { AlignmentType, Footer, Header, Paragraph } from "docx";

export const getHeader = novoglowId => {
    return new Header({
        children: [
            new Paragraph({
                style: 'headerFooter',
                text: `Audit ID: ${novoglowId}`
            })
        ],
    });
};

export const getFooter = () => {
    return new Footer({
        children: [
            new Paragraph({
                alignment: AlignmentType.START,
                style: 'headerFooter',
                text: 'ISO/GMP'
            }),
            new Paragraph({
                alignment: AlignmentType.END,
                style: 'headerFooter',
                text: 'Page 1 of 9'
            }),
        ],
    })
};