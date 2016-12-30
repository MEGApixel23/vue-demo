<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">
          <div class="panel-heading">Repo issuessss</div>

          <ul>
            <li v-for="issue in issues">
              <router-link :to="{name: 'issue', params: {id: issue.number}}">{{ issue.title }}</router-link>
            </li>
          </ul>

          <button @click="loading === false && getList()">{{ loading ? 'loading...' : 'Load more...' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        issues: [],
        page: 0
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.page = this.page + 1;
        this.loading = true;

        return this.$http
          .get(`https://api.github.com/repos/octocat/Hello-World/issues?page=${this.page}`)
          .then((response) => {
            this.issues = [...this.issues, ...response.body];
            this.loading = false;
          });
      }
    }
  }
</script>
