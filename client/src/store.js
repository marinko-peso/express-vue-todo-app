import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    todos: []
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    updateTodo(state, data) {
      state.todos[data.index] = data.todo;
    },
    deleteTodo(state, data) {
      state.todos.splice(data.index, 1);
    }
  },
  actions: {
    getInitialTodos: context => {
      axios.get('/api/all').then(response => {
        context.commit('setTodos', response.data);
      });
    },

    addTodo: (context, data) => {
      return new Promise((resolve, reject) => {
        axios.post('/api/add', { name: data.name })
          .then(response => {
            context.commit('addTodo', response.data);
            return resolve({});
          })
          .catch(error => {
            return reject({error: error});
          });
      });
    },

    updateTodo: (context, data) => {
      const index = data.index;
      delete data.index;
      axios.put(`/api/update/${data._id}`, data)
        .then(response => {
          context.commit('updateTodo', { todo: response.data, index: index })
        })
        .catch(error => {
          console.error(error);
        })
    },

    deleteTodo: (context, data) => {
      axios.delete(`/api/delete/${data._id}`)
        .then(() => {
          context.commit('deleteTodo', data);
        })
        .catch(error => {
          console.error(error);
        })
    }
  },
  getters: {
    todos: state => {
      return state.todos;
    }
  }
});
