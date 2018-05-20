<template>
  <div>
    <h2>Create an Item</h2>
    <form @submit.prevent>
      <div class="form-group">
        <input type="text"
               class="form-control"
               @keypress="typing=true"
               placeholder="What do you want to do?"
               v-model="todo"
               @keyup.enter="addTodo($event)">
        <span class="help-block small text-center" v-show="typing">Hit enter to save</span>
      </div>
    </form>
  </div>
</template>


<script>
  import axios from 'axios';

  import store from './../store';

  export default {
    data() {
      return {
        todo: '',
        typing: false
      }
    },
    store: store,
    methods: {
      addTodo(event) {
        if (event)
          event.preventDefault();
        this.$store.dispatch('addTodo', { name: this.todo })
          .then(() => {
            this.todo = '';
            this.typing = false;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
</script>
