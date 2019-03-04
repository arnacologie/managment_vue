<template>
  <div>
    <h1>Liste des projets</h1>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Montant total</th>
          <th>Statut du projet</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project._id">
          <th></th>
          <td>{{project.name}}</td>
          <td>{{project.desc}}</td>
          <td>{{project.date_start}}</td>
          <td>{{project.date_end}}</td>
          <td>{{project.total_cost}}</td>
          <td>{{project.status}}</td>
          <td>
            <button class="btn btn-danger" @click="deleteProject(project)">X</button>
            <a class="btn btn-primary" v-bind:href="'/projects/create/' + project._id">&#9998;</a>
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
  name: "Projects",
  components: {},
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    getProjects() {
      apiService.getProjects().then(data => {
        this.projects = data;
      });
    },
    deleteProject(project) {
      apiService.deleteProject(project).then(r => {
        if (r.status === 200) {
          alert("Project deleted");
          this.getProjects();
        }
        console.log(r.status);
      });
    }
  },
  mounted() {
    this.getProjects();
    console.log("PROJECTS "+this.projects.data)
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
