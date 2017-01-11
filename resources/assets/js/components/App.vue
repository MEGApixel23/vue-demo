<template>
  <div>
    <Login></Login>

    <router-view></router-view>
  </div>
</template>

<script>
  const Login = require('./Login.vue');

  export default {
    components: { Login }
  };
</script>