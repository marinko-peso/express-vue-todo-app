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
  import bus from './../event-bus';

  export default {
    data() {
      return {
        todo: '',
        typing: false
      }
    },
    methods: {
      addTodo(event) {
        if (event)
          event.preventDefault();
        const url = 'http://localhost:4000/api/add';
        const param = {
          name: this.todo,
          done: false
        };
        axios.post(url, param).then(response => {
          console.trace(response);
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
        }).catch(error => {
          console.error(error);
        });
      },
      clearTodo() {
        this.todo = '';
      },
      refreshTodo() {
        bus.$emit('refreshTodo');
      }
    }
  };
</script>
