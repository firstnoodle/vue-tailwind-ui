import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes.js';
import store from '~/store/index.js';

Vue.use(Router);

const router = createRouter({ base: '/' });

export default router;

/**
 * The router factory
 */
function createRouter({ base }) {
    const router = new Router({
        // scrollBehavior,
        base,
        mode: 'history',
        routes,
        linkActiveClass: 'is-active',
    });

    // router.beforeEach(beforeEach);
    router.afterEach(afterEach);

    return router;
}

/**
 * Global router guard.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
// eslint-disable-next-line no-unused-vars
async function beforeEach(to, from, next) {
    // if (window.Laravel.isAuthenticated) {
    //     if (!store.getters['app/user']) {
    //         store.dispatch('app/fetchUser');
    //     }
    //     next();
    // } else if (to.meta.requiresAuth) {
    //     next({
    //         name: 'login',
    //         query: { redirect: to.name },
    //     });
    // } else {
    //     next();
    // }
}

/**
 * Global after hook.
 *
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 */
// eslint-disable-next-line no-unused-vars
async function afterEach(to) {
    document.title = 'AuditTool - ' + to.meta.title;

    if(store.state.isMobile) {
        if(store.state.mobileMenuVisible) {
            store.dispatch('hideMobileMenu');
        }
        if(store.state.sidebarVisible) {
            store.dispatch('hideSidebar');
        }
    }
}
/**
 * Scroll Behavior
 *
 * @link https://router.vuejs.org/en/advanced/scroll-behavior.html
 *
 * @param  {Route} to
 * @param  {Route} from
 * @param  {Object|undefined} savedPosition
 * @return {Object}
 */
// eslint-disable-next-line no-unused-vars
function scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition;
    }

    if (to.hash) {
        return { selector: to.hash };
    }

    const [component] = router.getMatchedComponents({ ...to }).slice(-1);

    if (component && component.scrollToTop === false) {
        return {};
    }

    return { x: 0, y: 0 };
}