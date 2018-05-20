<template>
  <div class="input-group m-b-5">
    <div class="input-group m-b-5">
      <span class="input-group-addon addon-right">
        <input type="checkbox"
               v-model="done"
               :checked="done"
               :value="done"
               v-on:change="updateItem"
               title="Mark as done?"/></span>
      <input type="text"
             class="form-control"
             :class="done ? 'todo__done' : ''"
             v-model="name"
             @keypress="editing=true"
             @keyup.enter="updateItem" />
      <span class="input-group-addon addon-left"
            title="Delete todo?"
            v-on:click="deleteItem">X</span>
    </div>
    <span class="help-block-small" v-show="editing">
      Hit enter to update
    </span>
  </div>
</template>


<script>
  export default {
    props: ['todo', 'index'],
    data() {
      return {
        id: this.todo._id,
        name: this.todo.name,
        done: this.todo.done || false,
        editing: false
      }
    },
    methods: {
      updateItem () {
        this.$emit('update', {
          _id: this.id,
          name: this.name,
          done: this.done,
          index: this.index
        });
        this.editing = false;
      },

      deleteItem () {
        this.$emit('delete', {
          _id: this.id,
          index: this.index
        });
      }
    }
  }
</script>
