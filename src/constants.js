
export const AUDIT_RATINGS = {
    NOT_MEETING_STANDARDS: "Not meeting standards",
    LOW: "Low",
    SATISFACTORY: "Satisfactory",
    HIGH: "High",
    OUTSTANDING: "Outstanding"
};

export const INFORMATION_REQUEST_CRITERIAS = [
    {
        criteria: 'The following items should be available AFTER the opening meeting',
        requiresDate: false
    },
    {
        criteria: 'The following items should be available AT the opening meeting',
        requiresDate: false
    },
    {
        criteria: 'The following items should be available at the beginning of the audit of each department',
        requiresDate: false
    },
    {
        criteria: 'The following items should be delivered before DATE',
        requiresDate: true
    },
    {
        criteria: 'The following items are requested for handout to the auditors on DATE',
        requiresDate: true
    }
];

export const ROLES = {
    LEAD_AUDITOR: 'Lead auditor',
    AUDITOR: 'Auditor',
    TECHNICAL_EXPERT: 'Technical expert',
    OBSERVER: 'Observer'
};

export const SEVERITY_LEVELS = {
    MINOR: "Minor",
    MAJOR: "Major",
    CRITICAL: "Critical",
};