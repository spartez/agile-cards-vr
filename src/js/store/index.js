import Vue from 'vue';
import Vuex from 'vuex';
import * as firebaseState from './firebase';
import jira from './jira';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        jiraKey: undefined,
        boardId: undefined,
        userKey: "",
        isCardPreview: 0,
        currentCardPreview: {},
        users: []
    },
    mutations: {
        SET_JIRA_KEY(state, key) {
            state.jiraKey = key;
        },
        SET_BOARD_ID(state, boardId) {
            state.boardId = boardId;
        },
        SET_USER_KEY(state, userKey) {
            state.userKey = userKey;
        },
        updateRotation(state, value) {
            state.rotation = value;
        },
        updateCardPreview(state, card) {
            state.isCardPreview = true;
            state.currentCardPreview = card;
        },
        removeCardPreview(state) {
            state.isCardPreview = false;
        }
    },
    
    actions: {
        cardPreview({ commit, getters }, {column, index}) {
            commit('updateCardPreview', getters.board.columns[column].issues[index]);
        },
        userChanged() {
            debugger;
        },
        userAdded() {
            debugger;
        },
        userRemoved() {
            debugger;
        }
    },
    modules: {
        jira
    },
    getters: {
        userKey: state => state.userKey,
        isCardPreview: state => state.isCardPreview,
        currentCardPreview: state => state.currentCardPreview
    }
});

firebaseState.onChangeUser(userData => store.dispatch('userChanged', userData));
firebaseState.onAddUser(userData => store.dispatch('userAdded', userData));
firebaseState.onRemoveUser(userId => store.dispatch('userRemoved', userId));

store.watch(state => state.userKey, firebaseState.startFirebase);

module.exports = store;