import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as firebaseState from './firebase';
import jira from './jira';

const store = new Vuex.Store({
    modules: {
        jira
    },
    state: {
        rotation: "15 45 0"
    },
    
    mutations: {
        updateRotation(state, value) {
            state.rotation = value;
        }
    },
    
    getters: {
        rotation: state => state.rotation
    }
});

firebaseState.onChangeRotation(rotation => store.commit('updateRotation', rotation));

module.exports = store;