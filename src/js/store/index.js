import Vue from 'vue';
import Vuex from 'vuex';
import * as firebaseState from './firebase';
import jira from './jira';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        jiraKey: undefined,
        boardId: undefined,
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
        }
    },
    modules: {
        jira
    },
    getters: {
        rotation: state => state.rotation
    }
});

firebaseState.onChangeRotation(rotation => store.commit('updateRotation', rotation));

module.exports = store;
