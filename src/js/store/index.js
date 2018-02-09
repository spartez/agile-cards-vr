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
        cardPreview: 0,
        rotation: "15 45 0"
    },
    
    mutations: {
        updateRotation(state, value) {
            state.rotation = value;
        },
        updateCardPreview(state, value) {
            state.cardPreview = value;
        }
    },
    
    actions: {
        cardPreview({ commit }, card) {
            commit('updateCardPreview', card);
        }
    },
    
    getters: {
        userRotation: state => state.rotation,
        userCardPreview: state => state.cardPreview
    }
});

firebaseState.onChangeRotation(rotation => store.commit('updateRotation', rotation));

module.exports = store;