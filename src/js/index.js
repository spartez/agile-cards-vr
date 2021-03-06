import 'aframe';
import 'aframe-environment-component';
import 'aframe-text-geometry-component';

import Vue from 'vue';
import App from './components/App.vue';
import store from './store';
import queryString from 'query-string';

const params = queryString.parse(location.search);

store.commit('SET_JIRA_KEY', params.jiraKey);
store.commit('SET_BOARD_ID', params.boardId);
store.dispatch('fetchBoard');

if(params.userKey){
  store.commit('SET_USER_KEY', params.userKey);
}

new Vue({
  el: document.getElementById('app'),
  render: h => h(App),
  store
});
