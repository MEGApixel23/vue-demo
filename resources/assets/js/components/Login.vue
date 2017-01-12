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
  import { mapMutations } from 'vuex';
  import AuthResource from './../resources/auth/Auth.js';

  export default {
    data: () => ({
      email: null,
      password: null,
      error: null
    }),

    computed: {
      isAuth() {
        return !!this.$store.state.token;
      },
    },
    
    created() {
    },

    methods: {
      ...mapMutations([ 'setToken', 'removeToken' ]),

      onSubmit() {
        AuthResource.login({
          email: this.email, 
          password: this.password
        }).then(({body: {token}}) => {
          this.setToken(token);
        }).catch(() => {
          this.error = 'Wrong credentials';
        })
      },

      logout() {
        this.removeToken();
      },
    }
  }
</script>
