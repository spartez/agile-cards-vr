import 'aframe';
import 'aframe-environment-component';
import 'aframe-text-geometry-component';

import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue';

Vue.use(Vuex);

new Vue({
  el: document.getElementById('app'),
  render: h => h(App)
});
