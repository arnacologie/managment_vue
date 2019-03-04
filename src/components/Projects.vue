<template>
  <div>
    <h1>Liste des projets</h1>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo._id">
          <th></th>
          <td>{{todo.name}}</td>
          <td>{{todo._id}}</td>
          <td>
            <button class="btn btn-danger" @click="deleteTodo(todo)">X</button>
            <a class="btn btn-primary" v-bind:href="'/todos/create/' + todo._id">&#9998;</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/* eslint-disable */
import { APIService } from "../APIService";
const apiService = new APIService();

export default {
  name: "ListTodo",

  components: {},

  data() {
    return {
      todos: [],
      numberOfTodos: 0
    };
  },

  methods: {
    getTodos() {
      apiService.getTodos().then(data => {
        this.todos = data;
        this.numberOfProducts = data.count;
      });
    },
    deleteTodo(todo) {
      apiService.deleteTodo(todo).then(r => {
        if (r.status === 200) {
          alert("Todo deleted");
          this.getTodos();
        }
        console.log(r.status);
      });
    }
  },

  mounted() {
    this.getTodos();
    console.log("TODOS = "+this.todos.data)
  }
};
</script>

<style scoped>
.list-horizontal li {
  display: inline-block;
}

.list-horizontal li:before {
  content: "\00a0\2022\00a0\00a0";

  color: #999;

  color: rgba(0, 0, 0, 0.5);

  font-size: 11px;
}

.list-horizontal li:first-child:before {
  content: "";
}
</style>
