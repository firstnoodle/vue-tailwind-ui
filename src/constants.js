
export const AUDIT_RATINGS = {
    NOT_MEETING_STANDARDS: "Not meeting standards",
    LOW: "Low",
    SATISFACTORY: "Satisfactory",
    HIGH: "High",
    OUTSTANDING: "Outstanding"
};

export const CRITERIAS = {
    AFTER_OPENING_MEETING: 'The following items should be available AFTER the opening meeting',
    AT_THE_OPENING_MEETING: 'The following items should be available AT the opening meeting',
    BEGINNING_OF_THE_AUDIT: 'The following items should be available at the beginning of the audit of each department',
    BEFORE_DATE: 'The following items should be delivered before DATE',
    ON_DATE: 'The following items are requested for handout to the auditors on DATE',
};

export const INFORMATION_REQUEST_CRITERIAS = [
    {
        description: CRITERIAS.AFTER_OPENING_MEETING,
        requiresDate: false
    },
    {
        description: CRITERIAS.AT_THE_OPENING_MEETING,
        requiresDate: false
    },
    {
        description: CRITERIAS.BEGINNING_OF_THE_AUDIT,
        requiresDate: false
    },
    {
        description: CRITERIAS.BEFORE_DATE,
        requiresDate: true
    },
    {
        description: CRITERIAS.ON_DATE,
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