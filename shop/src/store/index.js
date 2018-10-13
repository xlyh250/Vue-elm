
import Vue from 'vue';
import vuex from 'vuex'
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions'

Vue.use(vuex)
console.log(getters);

export default new vuex.Store({
    state,
    getters,
    mutations,
    actions
})

