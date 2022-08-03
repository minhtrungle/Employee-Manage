<template>
    <div class='nav'>
       <div class='container'>
        <router-link to="/" class="brand-logo">Employee Manage</router-link>
          <ul>
            <li v-if='isLoggedIn'><router-link to='/userstable'>Home</router-link></li>
            <li v-if='!isLoggedIn'><router-link to='/login'>Login</router-link></li>
            <li v-if='!isLoggedIn'><router-link to='/register'>Register</router-link></li>
            <li v-if='isLoggedIn'><button @click='logout' class='btn black'>Logout</button></li>
          </ul>
       </div>
       
      </div>
</template>

<script>
import router from '../router/routers';
import logoutAPI  from '..//api/auth'
export default {
  name: "Header",
  data() {
		return {
			isLoggedIn: false,
		};
  },
  created() {
    let user = localStorage.getItem("Token");
		if (user) {
			this.isLoggedIn = true;
		}
	},
	methods: {
		async logout() {
      await logoutAPI.logoutPage()
      .then((data) => {
        localStorage.clear("Token", data.access_token);
      })
      .catch((error) => {
        console.error(error);
      });
      router.push({ name: "Login" });
    }
    }
  };
</script>
<style>
  


</style> 