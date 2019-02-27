import Vue from 'vue';
import Router from 'vue-router';

import RouterValidator from '../helper/RouterValidator.js';
import list from './list.js';

Vue.use(Router);

let router = new Router({
    routes: list,
    mode: 'history',
});

router.beforeEach((to, from, next) => {

    if(RouterValidator.home(to.meta)) {
        next({ name: 'Home' });
    } else {
        next();
    }
});

export default router;