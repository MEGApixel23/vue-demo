<template>
  <div v-if="isAuth === false" >
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
        <button type="submit" id="login">Login</button>
      </div>

      <div class="auth-errors error">{{ error }}</div>
    </form>
  </div>
  <div v-else>
    <div class="inline">
      <button @click="logout" type="submit" id="logout">Logout</button>
    </div>
  </div>
</template>

<style>
  .inline {
    display: inline-block;
  }
</style>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { SET_TOKEN, REMOVE_TOKEN, CHECK_TOKEN } from './../store/actions';

  export default {
    data: () => ({
      email: null,
      password: null,
      error: null
    }),

    computed: {
      ...mapGetters(['isAuth']),
    },

    created() {
      if (this.isAuth) {
        this[CHECK_TOKEN]();
      }
    },

    methods: {
      ...mapActions([ SET_TOKEN, REMOVE_TOKEN, CHECK_TOKEN ]),

      onSubmit() {
        this[SET_TOKEN]({
          email: this.email,
          password: this.password
        }).catch((error) => ( this.error = error ));
      },

      logout() {
        this[REMOVE_TOKEN]();
      },
    }
  }
</script>
