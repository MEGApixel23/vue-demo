<template>
  <div>
    <ul>
      <li v-for="item in items">
        <span>#{{ item.id }} {{ item.text }}</span>
        <a href="javascript:void(0);" v-if="isAuth === true" @click="DELETE_ITEM(item)">X</a>
      </li>
    </ul>

    <div v-if="isAuth === true">
      <label for="add-item"></label>
      <input id="add-item" type="text" v-model="itemText">
      <button @click="CREATE_ITEM(itemText)">Add Item</button>
    </div>
  </div>
</template>

<script>
  import ItemResource from './../resources/Item';
  import { mapGetters, mapActions, mapState } from 'vuex';
  import { GET_ITEMS, DELETE_ITEM, CREATE_ITEM } from './../store/actions';
  
  export default {
    created() {
      this[GET_ITEMS]();
    },

    computed: {
      ...mapGetters(['isAuth']),
      ...mapState(['items'])
    },

    methods: {
      ...mapActions([ GET_ITEMS, DELETE_ITEM, CREATE_ITEM ])
    }
  };
</script>