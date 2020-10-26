import Dashboard from '~/views/Dashboard/Index';
import Audit from '~/views/Audit/Index';
import Auditors from '~/views/Auditors/Index';
import Audits from '~/views/Audits/Index';
import Findings from '~/views/Findings/Index';

import AuditAgenda from '~/views/Audit/views/Agenda';
import AuditAuditee from '~/views/Audit/views/Auditee';
import AuditConclusion from '~/views/Audit/views/Conclusion';
import AuditDetails from '~/views/Audit/views/Details';
import AuditFindings from '~/views/Audit/views/Findings';
import AuditFocusAreas from '~/views/Audit/views/FocusAreas';
import AuditInformationRequests from '~/views/Audit/views/InformationRequests';
import AuditRequirements from '~/views/Audit/views/Requirements';
import AuditScope from '~/views/Audit/views/Scope';
import AuditSuggestions from '~/views/Audit/views/Suggestions';
import AuditTeam from '~/views/Audit/views/Team';

export default [
    {
        path: '/',
        component: Dashboard,
        name: 'Dashboard',
        meta: {
            title: 'Dashboard',
            requiresAuth: true,
        },
    },
    {
        path: '/auditors',
        component: Auditors,
        name: 'Auditors',
        meta: {
            title: 'Auditors',
            requiresAuth: true,
        },
    },
    {
        path: '/findings',
        component: Findings,
        name: 'Findings',
        meta: {
            title: 'Findings',
            requiresAuth: true,
        },
    },
    {
        path: '/audits',
        component: Audits,
        name: 'Audits',
        meta: {
            title: 'Audits',
            requiresAuth: true,
        },
    },
    {
        path: '/audits/:id',
        component: Audit,
        meta: {
            title: 'Audit',
            requiresAuth: true,
        },
        children: [
            {
                path: '/',
                component: AuditDetails,
                name: 'Audit details',
                meta: {
                    title: 'Details',
                    requiresAuth: true,
                }
            },
            {
                path: 'agenda',
                component: AuditAgenda,
                name: 'Audit agenda',
                meta: {
                    title: 'Agenda',
                    requiresAuth: true,
                }
            },
            {
                path: 'auditee',
                component: AuditAuditee,
                name: 'Audit auditee',
                meta: {
                    title: 'Auditee',
                    requiresAuth: true,
                }
            },
            {
                path: 'conclusion',
                component: AuditConclusion,
                name: 'Audit conclusion',
                meta: {
                    title: 'Conclusion',
                    requiresAuth: true,
                }
            },
            {
                path: 'findings',
                component: AuditFindings,
                name: 'Audit findings',
                meta: {
                    title: 'Findings',
                    requiresAuth: true,
                }
            },
            {
                path: 'focus-areas',
                component: AuditFocusAreas,
                name: 'Audit focus areas',
                meta: {
                    title: 'Focus Areas',
                    requiresAuth: true,
                }
            },
            {
                path: 'information-requests',
                component: AuditInformationRequests,
                name: 'Audit information requests',
                meta: {
                    title: 'Information requests',
                    requiresAuth: true,
                }
            },
            {
                path: 'requirements',
                component: AuditRequirements,
                name: 'Audit requirements',
                meta: {
                    title: 'Requirements',
                    requiresAuth: true,
                }
            },
            {
                path: 'scope',
                component: AuditScope,
                name: 'Audit scope',
                meta: {
                    title: 'Scope',
                    requiresAuth: true,
                }
            },
            {
                path: 'suggestions',
                component: AuditSuggestions,
                name: 'Audit suggestions',
                meta: {
                    title: 'Suggestions',
                    requiresAuth: true,
                }
            },
            {
                path: 'team',
                component: AuditTeam,
                name: 'Audit team',
                meta: {
                    title: 'Team',
                    requiresAuth: true,
                }
            },
        ]
    }
];