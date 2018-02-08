import * as firebaseState from './firebase';
import jira from './jira';

export default {
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
    }
};

firebaseState.onChangeRotation(rotation => store.commit('updateRotation', rotation));