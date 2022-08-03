
<template>
  <div class="register">
    <h1>Register</h1>
    <input type="text" v-model="username" placeholder="Nhập tên" />
    <input type="text" v-model="email" placeholder="Nhập email" />
    <input type="password" v-model="password" placeholder="Nhập mật khẩu" />
    <button @click="registerVue" >Register</button>
    <p>
      <router-link to="/login" >Login</router-link>
    </p>
  </div>
</template>
<script>
import registerAPI  from '..//api/auth'
export default {
  name: "Register",
  data() {
    return {
      username:"",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerVue() {
      console.log('fffff')
      let result = await registerAPI.registerPage({username: this.username, email: this.email, password: this.password });
      if (result.status == 201 && result.data.length > 0) {
        localStorage.setItem("Token", result.data);
        alert(`Tài khoản đã được tạo có email là: ${result.data.email}`);
        this.$router.push({ name: "Login" });
      }
      console.warn(result);
    },
  },
  mounted() {
    let user = localStorage.getItem('Token');
    if(user) {
      this.$router.push({name:'UsersTable'})
    }
  }
};
</script>

<style>

</style>





<!-- <template>
  <div>
    <div class="container">
    <div class="row">
      <div class="col s12 m8 offset-m2">
        <div class="login card-panel grey lighten-4 black-text center">
          <h3>Register</h3>
           <div class="input-field">
              <i class="material-icons prefix">user</i>
              <input type="text" v-model="usernameVue" placeholder="Nhập tên" />
              <label for="text">Username</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="text" v-model="email" placeholder="Nhập email" />
              <label for="email">Email Address</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
                <input type="text" v-model="password" placeholder="Nhập mật khẩu" />
              <label for="password">Password</label>
            </div>
            <button @click="registerVue" class="btn btn-large btn-extended grey lighten-4 black-text">Register</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template> -->