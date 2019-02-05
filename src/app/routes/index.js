import Vue from 'vue';
import Router from 'vue-router';

import list from './list.js';

Vue.use(Router);

export default new Router({
    routes: list,
    mode: 'history',
})