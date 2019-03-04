<template>
  <div id="container" class="container">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="alert alert-warning" v-show="showError">
          <button type="button" class="close" @click="hideMessage()">X</button>
          <strong>Erreur!</strong>
        </div>
        <h1>Créer un project</h1>

        <div class="info-form">
          <form>
            <div class="form-group">
              <label for="name">Nom du projet</label>
              <input
                v-model="project.name"
                type="text"
                class="form-control"
                id="name"
                aria-describedby="nameHelp"
              >
              <br><label for="desc">Description du projet</label>
              <input
                v-model="project.desc"
                type="text"
                class="form-control"
                id="desc"
                aria-describedby="nameHelp"
              >
              <br><label for="date_start">Date de début</label>
              <date-picker id="date_start" v-model="project.date_start" :config="options"></date-picker>

              <br><label for="date_end">Date de fin</label>
              <date-picker id="date_end" v-model="project.date_end" :config="options"></date-picker>

              <br><label for="total_cost">Coût total du projet</label>
              <input
                v-model="project.total_cost"
                type="text"
                class="form-control"
                id="total_cost"
                aria-describedby="nameHelp"
              >

              <br><label for="status">Statut</label>
              <select v-model="project.status" class="form-control" id="status">
                <option>Prospect</option>
                <option>En cours</option>
                <option>Annulé</option>
                <option>Terminé</option>
              </select>
            </div>
          </form>

          <button class="btn btn-primary" v-if="!this.project._id" @click="createProject()">
            <span>Créer</span>
          </button>
          <button class="btn btn-primary" v-if="this.project._id" @click="updateProject()">
            <span>Mettre à jour</span>
          </button>
          <button class="btn btn-primary" @click="newProject()">Vider les champs</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { APIService } from "../APIService";

const apiService = new APIService();
import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

export default {
  name: "CU_Project",

  components: {
    datePicker
  },

  data() {
    return {
      date : new Date(),
      options : {
        format: 'DD/MM/YYYY',
        useCurrent: false
      },
      updateMode : false,
      showError: false,
      project: {},
      address : {
          street : '',
          city :  '',
          zip_code: ''
      },
      referent_contact : {
          first_name : '',
          family_name : '',
          phone_number : '',
          mail : ''
      }
    };
  },

  methods: {
    createProject() {
      this.project.address = this.address;
      this.project.referent_contact = this.referent_contact;
      
      apiService.createProject(this.project).then(
        result => {
          console.log(result);
          if (result.status === 200) {
            this.project = result.data;
            console.log(result.status)
            alert("Project created");
            this.$router.push('/projects')
          }
        },
        error => {
          this.showError = true;
          console.log(error);
        }
      );
    },
    updateProject() {
      this.project.address = this.address;
      this.project.referent_contact = this.referent_contact;
      console.log(this.project.company_name);
      apiService.updateProject(this.project).then(
        result => {
          console.log(result);
          alert("Project updated");
          this.$router.push('/projects')
        },
        error => {
          this.showError = true;
        }
      );
    },
    newProject() {
      this.project = {};
    }
  },

  mounted() {
    if (this.$route.params.id != ':id') {
      apiService.getProject(this.$route.params.id).then(project => {
        this.updateMode = true;
        this.project = project;
        this.address = project.address;
        this.referent_contact = project.referent_contact;
        console.log(this.$route.params.id);
      });
    }
  }
};
</script>

<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>
