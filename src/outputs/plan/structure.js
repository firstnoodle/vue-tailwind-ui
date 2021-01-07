import { Paragraph, TextRun } from "docx";

export const sourceTemplates = {
    auditTeam: {
        name: 'Audit team',
        render: team => {
            return [
                new Paragraph({
                    style: 'bodyBold',
                    text: 'Name (initials) and role in the audit'
                }),
                ...team.map(actor => {
                    return new Paragraph({
                        style: 'body',
                        text: `${actor.name} (${actor.initials}) - ${actor.role}`
                    });
                })
            ]
        }
    },
    planRecipients: {
        name: 'Recipients',
        render: recipients => {
            const mainRecipients = recipients.filter(recipient => !recipient.copy);
            const copyRecipients = recipients.filter(recipient => recipient.copy);
            return [
                new Paragraph({
                    style: 'bodyBold',
                    text: 'Recipients'
                }),
                new Paragraph({
                    style: 'body',
                    children: mainRecipients.map((recipient, index) => {
                        const prependage = index > 0 ? ', ' : '';
                        return new TextRun(`${prependage}${recipient.name} (${recipient.initials})`)
                    }),
                }),
                new Paragraph({
                    style: 'bodyBold',
                    text: 'Copy'
                }),
                new Paragraph({
                    style: 'body',
                    children: copyRecipients.map((recipient, index) => {
                        const prependage = index > 0 ? ', ' : '';
                        return new TextRun(`${prependage}${recipient.name} (${recipient.initials})`)
                    }),
                }),
            ]
        }
    }
}

// export default {
//     name: 'Plan',
//     title: domain => {
//         return `${domain} Audit Plan`
//     },
//     chapters: [
//         {
//             name: 'Front page',
//             sections: [
//                 {
//                     title: '',
//                     description: null,
//                     source: null
//                 },
//             ]
//         },
//         {
//             name: 'Main',
//             sections: [
//                 {
//                     title: 'Introduction to the audit',
//                     description: unit => {
//                         return `This document serves as the Audit Plan of ${unit}. Etc etc.`
//                     },
//                     source: null
//                 },
//                 {
//                     title: 'Unit representatives and main contacts for the audit',
//                     description: null,
//                     source: sourceTemplates.auditTeam
//                 }
//             ]
//         }
//     ]
// }