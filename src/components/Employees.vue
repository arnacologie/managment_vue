<template>
  <div>
    <h1>Liste des salariés</h1>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prenom</th>
          <th>Pseudo</th>
          <th>Date de naissance</th>
          <th>Adresse</th>
          <th>Numéro de tel</th>
          <th>Email</th>
          <th>Poste</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee._id">
          <td>{{employee.family_name}}</td>
          <td>{{employee.first_name}}</td>
          <td>{{employee.username}}</td>
          <td>{{employee.date_of_birth}}</td>
          <td><span v-for="item in employee.address" :key="item">{{item}} </span></td>
          <td>{{employee.phone_number}}</td>
          <td>{{employee.email}}</td>
          <td>{{employee.position}}</td>
          <td>
            <button class="btn btn-danger" @click="deleteEmployee(employee)">X</button>
            <a class="btn btn-primary" v-bind:href="'/employees/create/' + employee._id">&#9998;</a>
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
  name: "Employees",

  components: {},

  data() {
    return {
      employees: [],
    };
  },

  methods: {
    getEmployees() {
      apiService.getEmployees().then(data => {
        this.employees = data;
      });
    },
    deleteEmployee(employee) {
      apiService.deleteEmployee(employee).then(r => {
        if (r.status === 200) {
          alert("Employee deleted");
          this.getEmployees();
        }
        console.log(r.status);
      });
    }
  },

  mounted() {
    this.getEmployees();
    console.log("EMPLOYEES = "+this.employees.data)
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
