const FONT = 'apis';

export default {
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
            id: "headerFooter",
            name: "headerFooter",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                color: '777777',
                font: FONT,
                size: 16,
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
        {
            id: "bodyBold",
            name: "bodyBold",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
                bold: true,
                font: FONT,
                size: 20,
            },
            paragraph: {},
        },
    ]
};