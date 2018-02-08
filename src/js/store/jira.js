const state = {
    board: []
};
const getters = {};
const mutations = {
    SET_BOARD(state, board) {
        state.board = board;
    }
};

const actions = {
    async fetchBoard() {

    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
