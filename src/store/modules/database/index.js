import audit_user_roles from '~/../demo/data/audit_user_roles.js';
import domains from '~/../demo/data/domains.js';
import focus_areas from '~/../demo/data/focus_areas.js';
import information_requests from '~/../demo/data/information_requests.js';
import addresses from '~/../demo/data/paragraf39.js';
import requirements from '~/../demo/data/requirements.js';
import trend_categories from '~/../demo/data/trend_categories.js';
import users from '~/../demo/data/users.js';

export default {
    namespaced: true,
    state: {
        audit_user_roles,
        domains,
        focus_areas,
        information_requests,
        addresses,
        requirements,
        trend_categories,
        users
    },
}