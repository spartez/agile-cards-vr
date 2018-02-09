import Vue from 'vue';
import Vuex from 'vuex';
import * as firebaseState from './firebase';
import jira from './jira';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        jiraKey: undefined,
        boardId: undefined,
        cardPreview: 0,
        rotation: "15 45 0"
    },
    mutations: {
        SET_JIRA_KEY(state, key) {
            state.jiraKey = key;
        },
        SET_BOARD_ID(state, boardId) {
            state.boardId = boardId;
        },
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
    modules: {
        jira
    },
    getters: {
        userRotation: state => state.rotation,
        userCardPreview: state => state.cardPreview
    }
});

firebaseState.onChangeRotation(rotation => store.commit('updateRotation', rotation));

module.exports = store;
