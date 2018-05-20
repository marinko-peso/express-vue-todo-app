<template>
  <div>
    <div class="col-md-12" v-show="todos.length">
      <h3>Todo Items</h3>
      <TodoItem v-for="(todo, index) in todos"
                v-bind:todo="todos[index]"
                v-bind:index="index"
                v-on:update="updateTodo"
                v-on:delete="deleteTodo"
                v-bind:key="todo.id">
      </TodoItem>
    </div>

    <div class="row alert alert-info text-center" v-show="!todos.length">
      <p class="alert alert-info">
        <strong>All Caught Up</strong>
        <br />
        You do not have any todo items!
      </p>
    </div>
  </div>
</template>


<script>
  import { mapGetters } from 'vuex';

  import store from './../store';
  import TodoItem from './TodoItem.vue';

  export default {
    data() {
      return {}
    },
    components: {
      TodoItem
    },
    store: store,
    /**
     * Once created fetch items and start listening for events.
     */
    created: function() {
      this.$store.dispatch('getInitialTodos');
    },
    computed: {
      ...mapGetters([
        'todos'
      ])
    },
    methods: {
      updateTodo(data) {
        this.$store.dispatch('updateTodo', data);
      },
      deleteTodo(data) {
        this.$store.dispatch('deleteTodo', data);
      }
    }
  };
</script>


<style>
  .delete__icon {}
  .todo__done {
    text-decoration: line-through !important
  }
  .no_border_left_right {
    border-left: 0px;
    border-right: 0px;
  }
  .flat_form {
    border-radius: 0px;
  }
  .mrb-10 {
    margin-bottom: 10px;
  }
  .addon-left {
    background-color: none !important;
    border-left: 0px !important;
    cursor: pointer !important;
  }
  .addon-right {
    background-color: none !important;
    border-right: 0px !important;
  }
</style>
