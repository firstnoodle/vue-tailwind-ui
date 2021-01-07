import { Paragraph, TextRun } from "docx";

/**
 * Statically defined templates for how different audit "data types" is rendered:
 * Eg. focusAreas, requirements, findings, etc.
 */
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
    focusAreas: {
        name: 'Focus Areas',
        render: focusAreas => {
            return [
                new Paragraph({
                    style: 'bodyBold',
                    text: 'Focus Areas'
                }),
                ...focusAreas.map(focusArea => {
                    return new Paragraph({
                        style: 'body',
                        text: focusArea.name
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
                new Paragraph({ style: 'body', text: '' }),
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
    },
    requirements: {
        name: 'Requirements',
        render: requirements => {
            return [
                new Paragraph({
                    style: 'bodyBold',
                    text: 'Requirements'
                }),
                ...requirements.map(requirement => {
                    return new Paragraph({
                        style: 'body',
                        text: requirement.description,
                        bullet: 0
                    });
                })
            ]
        }
    },
    scope: {
        name: 'Scope',
        render: scope => {
            return [
                new Paragraph({
                    style: 'bodyBold',
                    text: 'Requirements'
                }),
                new Paragraph({
                    style: 'body',
                    text: scope
                }),
            ]
        }
    },
    unitRepresentatives: {
        name: 'Unit representatives',
        render: auditee => {
            return [
                new Paragraph({
                    style: 'bodyBold',
                    text: 'Unit head'
                }),
                new Paragraph({
                    style: 'body',
                    text: `${auditee.head.name} (${auditee.head.initials})`
                }),
                new Paragraph({
                    style: 'bodyBold',
                    text: 'Unit coordinator'
                }),
                new Paragraph({
                    style: 'body',
                    text: `${auditee.coordinator.name} (${auditee.coordinator.initials}) - ${auditee.coordinator.email}`
                }),
            ]
        }
    }
}