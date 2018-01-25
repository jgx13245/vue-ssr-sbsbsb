import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  pic: []
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});