import 'aframe';
import 'aframe-environment-component';
import 'aframe-text-geometry-component';

import Vue from 'vue';
import store from './store'; 
import App from './components/App.vue';

new Vue({
  el: document.getElementById('app'),
  render: h => h(App),
  store
});
