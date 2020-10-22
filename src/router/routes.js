import Audit from '~/views/Audit/Index';
import Audits from '~/views/Audits/Index';

import Agenda from '~/views/Audit/views/Agenda';
import Auditee from '~/views/Audit/views/Auditee';
import Conclusion from '~/views/Audit/views/Conclusion';
import Findings from '~/views/Audit/views/Findings';
import FocusAreas from '~/views/Audit/views/FocusAreas';
import InformationRequests from '~/views/Audit/views/InformationRequests';
import Requirements from '~/views/Audit/views/Requirements';
import Scope from '~/views/Audit/views/Scope';
import Suggestions from '~/views/Audit/views/Suggestions';
import Team from '~/views/Audit/views/Team';

export default [
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
        name: 'Audit',
        meta: {
            title: 'Audit',
            requiresAuth: true,
        },
        children: [
            {
                path: 'agenda',
                component: Agenda,
                name: 'Agenda',
                meta: {
                    title: 'Agenda',
                    requiresAuth: true,
                }
            },
            {
                path: 'auditee',
                component: Auditee,
                name: 'Auditee',
                meta: {
                    title: 'Auditee',
                    requiresAuth: true,
                }
            },
            {
                path: 'conclusion',
                component: Conclusion,
                name: 'Conclusion',
                meta: {
                    title: 'Conclusion',
                    requiresAuth: true,
                }
            },
            {
                path: 'findings',
                component: Findings,
                name: 'Findings',
                meta: {
                    title: 'Findings',
                    requiresAuth: true,
                }
            },
            {
                path: 'focus-areas',
                component: FocusAreas,
                name: 'FocusAreas',
                meta: {
                    title: 'FocusAreas',
                    requiresAuth: true,
                }
            },
            {
                path: 'information-requests',
                component: InformationRequests,
                name: 'InformationRequests',
                meta: {
                    title: 'Information requests',
                    requiresAuth: true,
                }
            },
            {
                path: 'requirements',
                component: Requirements,
                name: 'Requirements',
                meta: {
                    title: 'Requirements',
                    requiresAuth: true,
                }
            },
            {
                path: 'scope',
                component: Scope,
                name: 'Scope',
                meta: {
                    title: 'Scope',
                    requiresAuth: true,
                }
            },
            {
                path: 'suggestions',
                component: Suggestions,
                name: 'Suggestions',
                meta: {
                    title: 'Suggestions',
                    requiresAuth: true,
                }
            },
            {
                path: 'team',
                component: Team,
                name: 'Team',
                meta: {
                    title: 'Team',
                    requiresAuth: true,
                }
            },
        ]
    }
];