<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Toutes les statistiques sont calculées en temps réel</p>
    <h3>Nombre de clients : </h3>
    <ul>
      <h1>{{clientNr}}</h1>
    </ul>
    <h3>Nombre de salariés dans l’agence : </h3>
    <ul>
      <h1>{{employeeNr}}</h1>
    </ul>
    <h3>Nombre de projets : </h3>
    <ul>
      <h1>{{projectNr}}</h1>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import { APIService } from "../APIService";
const apiService = new APIService();
export default {
  name: 'Stats',
  props: {
    msg: String
  },

  data() {
    return {
      clientNr : 0,
      employeeNr : 0,
      projectNr : 0
    };
  },

  methods: {
    getClientNr() {
      apiService.getClientNr().then(data =>{
        this.clientNr = data.data;
      });
    },
    getEmployeeNr() {
      apiService.getEmployeeNr().then(data =>{
        this.employeeNr = data.data;
      });
    },
    getProjectNr() {
      apiService.getProjectNr().then(data =>{
        this.projectNr = data.data;
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
    this.getClientNr();
    this.getEmployeeNr();
    this.getProjectNr();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
