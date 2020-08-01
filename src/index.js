import "babel-polyfill";

import Vue from "vue";

import Hotels from "./Hotels.vue"

new Vue({
  el: "#app",
  render: h => h(Hotels),
});
