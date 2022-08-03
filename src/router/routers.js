import UsersTable from "../views/UsersTable.vue";
import Register from "../views/Register.vue";
import Login from '../views/Login.vue';
import Router from "vue-router";
import Vue from 'vue'
Vue.use(Router)
const routes = [{
        name: "UsersTable",
        component: UsersTable,
        path: "/userstable"
    },
    {
        name: "Register",
        component: Register,
        path: "/register",
    },
    {
        name: "Login",
        component: Login,
        path: "/login",
    },
];
const router = new Router({
    mode: 'history',
    routes
  })
export default router;