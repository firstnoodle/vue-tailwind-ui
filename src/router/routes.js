import Audit from '~/views/Audit/index';
import Audits from '~/views/Audits/index';

export default [
    {
        path: '/',
        component: Audits,
        name: 'Audits',
        meta: {
            title: 'Audits',
            requiresAuth: true,
        },
    },
    {
        path: '/:id',
        component: Audit,
        name: 'Audit',
        meta: {
            title: 'Audit',
            requiresAuth: true,
        },
    },
];