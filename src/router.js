import VueRouter, { RouteConfig } from "vue-router";
import Vue from "vue";

import { Hotels } from "./pages";

Vue.use(VueRouter);

/** @type {RouteConfig[]} */
const routes = [
  { path: "/hotels", component: Hotels },
];

export default new VueRouter({ routes });
