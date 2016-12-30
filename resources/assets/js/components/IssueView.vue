<template>
  <div>
    <router-link :to="{name: 'home'}">{{ '<- Go back' }}</router-link>

    <table v-if="issue">
      <tr>
        <th>ID</th>
        <td>{{ issue.id }}</td>
      </tr>
      <tr>
        <th>Number</th>
        <td>{{ issue.number }}</td>
      </tr>
      <tr>
        <th>Title</th>
        <td>{{ issue.title }}</td>
      </tr>
      <tr>
        <th>Updated At</th>
        <td>{{ issue.updated_at }}</td>
      </tr>
    </table>

  </div>
</template>
<style>

</style>
<script>
  import IssueResource from './../resources/Issue';

  export default {
    data() {
      return {
        loading: false,
        issue: {}
      };
    },
    created() {
      this.getIssueById(this.$route.params.id);
    },
    methods: {
      getIssueById(id) {
        this.loading = true;

        return IssueResource.get({id}).then((response) => {
            this.issue = response.body;
            this.loading = false;
          });
      }
    }
  }
</script>
