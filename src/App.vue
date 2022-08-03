<template>
  <div id="app">
    <Header/>
  <router-view></router-view>
</div>
</template>

<script>
import Header from './components/Header.vue';
/*import Header from "./components/Header.vue";
import UserRegisterForm from ".//views/UserRegisterForm.vue";
import UserEditForm from ".//views/UserEditForm.vue";
import UsersTable from ".//views/UsersTable.vue";
import Register from ".//views/Register.vue";
import Login from ".//views/Login.vue"*/


export default {
    name: "App",
    comments: {
        Header
    },
    components: { Header }
};
</script>

<style>
#app {
  margin-top: 40px;
}
body { 
padding: 0;
margin: 0;
}
.register input, .login input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}
.register button, .login button {
  width: 320px;
  height: 40px;
  border: 1px solid skyblue;
  background: skyblue;
  color: #fff;
  cursor: pointer;
  display: block;

}
</style> 