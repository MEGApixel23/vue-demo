<template>
  <div v-if="this.isAuth === false" >
    <form v-on:submit.prevent="onSubmit">
      <div class="inline">
        <label for="email"></label>
        <input type="email" id="email" v-model="email" />
      </div>

      <div class="inline">
        <label for="password"></label>
        <input type="password" id="password" v-model="password" />
      </div>

      <div class="inline">
        <button type="submit">Login</button>
      </div>

      <div>{{ error }}</div>
    </form>
  </div>
  <div v-else>
    <div class="inline">
      <button @click="logout" type="submit">Logout</button>
    </div>
  </div>
</template>
<style>
  .inline {
    display: inline-block;
  }
</style>
<script>
  import AuthResource from './../resources/auth/Auth.js';

  export default {
    data: () => ({
      token: null,
      email: null,
      password: null,
      error: null,
      isAuth: false
    }),

    created() {
      this.isAuth = AuthResource.isAuth();
    },

    methods: {
      onSubmit() {
        AuthResource.login({
          email: this.email, 
          password: this.password
        }).then(({body: {token}}) => {
          AuthResource.setToken(token);
          this.isAuth = AuthResource.isAuth();
        }).catch(() => {
          this.error = 'Wrong credentials';
        })
      },

      logout() {
        AuthResource.destroyToken();
        this.isAuth = AuthResource.isAuth();
      },
    }
  }
</script>
