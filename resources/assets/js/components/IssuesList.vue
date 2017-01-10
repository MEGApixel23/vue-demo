<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-md-offset-2">
        <div class="panel panel-default">

          <div v-if="this.repository === undefined">
            <label for="search-repo"></label>
            <input id="search-repo" type="url" name="search-repo" v-model="search" />
            <button @click="findRepo(search)">Find Repo</button>

            <ul>
              <li v-for="repo in repositories">
                <a href="javascript:void(0);" @click="setSelectRepo(repo)">{{ repo.name }}</a>
              </li>
            </ul>
          </div>

          <div v-else>
            <h1>Issues for repo "{{ repository.fullName }}"</h1>

            <ul>
              <li v-for="issue in issues">
                <router-link :to="{name: 'issue', params: {id: issue.number}}">{{ issue.title }}</router-link>
              </li>
            </ul>

            <button v-if="(this.lastPage === undefined) || this.page < this.lastPage"
                    @click="loading === false && getList()"
            >{{ loading ? 'loading...' : 'Load more...' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IssueResource from './../resources/Issue';
  import RepositoryResource from './../resources/Repository';

  export default {
    data() {
      return {
        loading: false,

        issues: [],
        page: 0,
        lastPage: undefined,

        search: undefined,
        repositories: undefined,
        repository: undefined
      };
    },

    created() {
      this.repository = this.getSelectRepo();

      if (this.repository) {
        this.getList();
      }
    },

    methods: {
      findRepo(search) {
        if (search) {
          return RepositoryResource.query({q: search})
            .then((response) => {
              this.repositories = response.body.items;
            });
        }

        return false;
      },
      getList() {
        this.page = this.page + 1;
        this.loading = true;

        return IssueResource.query({
          page: this.page,
          name: this.repository.name,
          ownerLogin: this.repository.ownerLogin
        }).then((response) => {
            let lastPage = IssueResource.parseLastPage(response);

            this.issues = [...this.issues, ...response.body];
            this.loading = false;
            this.lastPage = lastPage === undefined ? this.lastPage : lastPage;
          });
      },
      setSelectRepo(repo) {
        window.localStorage.setItem('selectedRepo', JSON.stringify({
          id: repo.id,
          name: repo.name,
          ownerLogin: repo.owner.login
        }));

        return this.repository = this.getSelectRepo();
      },
      getSelectRepo() {
        try {
          return JSON.parse(window.localStorage.getItem('selectedRepo')) || undefined;
        } catch (e) { }

        return undefined;
      }
    }
  }
</script>
