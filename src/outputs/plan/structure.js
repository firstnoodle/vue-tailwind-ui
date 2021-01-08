import { sourceTemplates } from '../sources';

export default {
    name: 'Plan',
    title: domain => {
        return `${domain} Audit Plan`
    },
    chapters: [
        {
            name: 'Front page',
            sections: [
                {
                    title: '',
                    description: null,
                    source: null
                },
            ]
        },
        {
            name: 'Main',
            sections: [
                {
                    title: 'Introduction to the audit',
                    description: unit => `This document serves as the Audit Plan of ${unit}. Etc etc.`,
                    source: null,
                },
                {
                    title: 'Unit representatives and main contacts for the audit',
                    description: null,
                    source: sourceTemplates.unitRepresentatives
                }
            ]
        }
    ]
}