import { Footer, Header, Paragraph } from "docx";

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
                style: 'headerFooter',
                text: '1 of 9'
            })
        ],
    })
};