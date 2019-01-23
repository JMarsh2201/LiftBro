import Vue from 'vue';
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    muscleGroups: [],
    selectedExercises: [],
    user: {
      email: '',
      password: ''
    }
  },
  actions: actions,
  getters: getters,
  mutations: mutations
});
