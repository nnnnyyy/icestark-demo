import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
import App from "./App.vue";
import router from "./router.js";

Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  console.log(to, from, "to-from");
  next();
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
