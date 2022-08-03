<template>
  <div class="login">
    <h1>Login</h1>
    <input type="text" v-model="username" placeholder="Nhập email" />
    <input type="password" v-model="password" placeholder="Nhập mật khẩu" />
    <button @click="loginVue">Login</button>
    <p>
      <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>
<script>
import loginAPI  from '..//api/auth'
import router from '../router/routers.js';
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async loginVue() {
      
      await loginAPI.loginPage({username: this.username, password: this.password })
      .then((data) => {
        console.log(data)
        this.username = data;
        this.password = data;
        localStorage.setItem("Token", data.access_token)
      })
      .catch((error) => {
        console.error(error);
      });
      router.push({ name: "UsersTable" });
      // console.log("async login" + result)
      // console.log('...', + result, + result.status, + result.data )
      // if (result && result.status == 200 && result.data.length > 0) {
      //   localStorage.setItem("Token", result.data.access_token);
        
      }
      // router.push({ name: "UsersTable" });
      // console.warn(result);
  },
  
  mounted() {
    let user = localStorage.getItem("Token");
    if (user) {
      this.$router.push({ name: "UsersTable" });
    }
  },
};
</script>
<style>
</style>








<!-- <template>
  <div>
    <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel green white-text center">
          <h3>Login</h3>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
             <input type="text" v-model="email" placeholder="Nhập email" />
              <label class="white-text" for="email">Email Address</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" v-model="password" placeholder="Nhập mật khẩu" />
              <label class="white-text" for="password">Password</label>
            </div>
            <button @click="loginVue" class="btn btn-large btn-extended grey lighten-4 black-text">Login</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template> -->