import Vue from 'vue';
import App from './App.vue';
import router from './router/routers.js'
//import { createApp } from 'vue' 

Vue.config.productionTip = false;

export const EventBus = new Vue();

/*const app =createApp(App);
app.use(router);
app.mount('#app');*/
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
