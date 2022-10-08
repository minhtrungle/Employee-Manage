import Vue from 'vue';
import App from './App.vue';
import router from './router/routers.js'
//import { createApp } from 'vue' 
import Vuex from 'vuex';
import Vuelidate from "vuelidate"
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/vi";
import JwPagination from 'jw-vue-pagination';

Vue.use(Vuex);
Vue.component('jw-pagination', JwPagination);
Vue.use(ElementUI, { locale });
Vue.use(Vuelidate)
Vue.config.productionTip = false;

export const EventBus = new Vue();

/*const app =createApp(App);
app.use(router);
app.mount('#app');*/
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
