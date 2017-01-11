<template>
  <div>
    <ul>
      <li v-for="item in items">
        <span>#{{ item.id }} {{ item.text }}</span>
        <a href="javascript:void(0);" @click="deleteItem(item)">X</a>
      </li>
    </ul>

    <label for="add-item"></label>
    <input id="add-item" type="text" v-model="itemText">
    <button @click="addItem(itemText)">Add Item</button>
  </div>
</template>

<script>
  import ItemResource from './../resources/Item';
  
  export default {
    data: () => ({
      items: undefined
    }),

    created() {
      this.getItems();
    },

    methods: {
      addItem(text) {
        ItemResource.save({ text })
          .then(({ body }) => {
            this.items.push(body);
          });
      },

      deleteItem(item) {
        ItemResource.delete({id: item.id})
          .then(({ body }) => {
            this.items = this.items.filter((item) => ( item.id !== body.id) );
          });
      },

      getItems() {
        ItemResource.query()
          .then(({ body: {data} }) => {
            this.items = data;
          });
      }
    }
  };
</script>