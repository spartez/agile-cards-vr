import axios from 'axios';

const state = {
    board: {}
};
const getters = {
    board: state => state.board
};
const mutations = {
    SET_BOARD(state, board) {
        console.log('SET_BOARD', board);
        state.board = board;
    }
};

const actions = {
    async fetchBoard({ commit, rootState }) {
        const { data } = await axios.get(`/api/${rootState.jiraKey}/board/${rootState.boardId}`);
        console.log('fetchBoard', data);
        commit('SET_BOARD', data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
