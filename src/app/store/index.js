import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

import state from './state.js';
import mutations from './mutations.js';
import actions from './actions.js';

const vuexLocalStorage = new VuexPersist({
    key: 'VertoR-service-vuex',
    storage: localStorage,
});

export default new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions,
    plugins: [vuexLocalStorage.plugin]
})