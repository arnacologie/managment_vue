<template>
  <div id="container" class="container">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="alert alert-warning" v-show="showError">
          <button type="button" class="close" @click="hideMessage()">X</button>
          <strong>Erreur!</strong>
        </div>
        <h1>Créer un salairié</h1>

        <div class="info-form">
          <form>
            <div class="form-group">
              <label for="family_name">Nom</label>
              <input
                v-model="employee.family_name"
                type="text"
                class="form-control"
                id="family_name"
                aria-describedby="nameHelp"
              >
              <label for="first_name">Prénom</label>
              <input
                v-model="employee.first_name"
                type="text"
                class="form-control"
                id="first_name"
                aria-describedby="nameHelp"
              >
              <label for="username">Pseudonyme</label>
              <input
                v-model="employee.username"
                type="text"
                class="form-control"
                id="username"
                aria-describedby="nameHelp"
              >
              <br><label for="date_of_birth">Date de naissance</label>
              <date-picker id="date_of_birth" v-model="employee.date_of_birth" :config="options"></date-picker>

              <br><label for="street">Adresse</label>
              <div v-if="this.updateMode">
                <div v-for="(item, index) in employee.address" :key="index">
                  <div v-if="index == 'street'">
                    <small id="street" class="form-text text-muted">Rue</small>
                    <input
                      v-model="address.street"
                      type="text"
                      class="form-control"
                      id="street"
                      aria-describedby="nameHelp">
                  </div>
                  <div v-if="index == 'city'">
                    <small id="nameHelp" class="form-text text-muted">Ville</small>
                    <input
                      v-model="address.city"
                      type="text"
                      class="form-control"
                      id="city"
                      aria-describedby="nameHelp">
                  </div>
                  <div v-if="index == 'zip_code'">
                    <small id="nameHelp" class="form-text text-muted">Code Postal</small>
                    <input
                      v-model="address.zip_code"
                      type="text"
                      class="form-control"
                      id="zip_code"
                      aria-describedby="nameHelp">
                  </div>
                </div>
              </div>
              <div v-if="!this.updateMode">
                <small id="nameHelp" class="form-text text-muted">Rue</small>
                <input
                  v-model="address.street"
                  type="text"
                  class="form-control"
                  id="street"
                  aria-describedby="nameHelp"
                >
                <small id="nameHelp" class="form-text text-muted">Ville</small>
                <input
                  v-model="address.city"
                  type="text"
                  class="form-control"
                  id="city"
                  aria-describedby="nameHelp"
                >
                <small id="nameHelp" class="form-text text-muted">Code Postal</small>
                <input
                  v-model="address.zip_code"
                  type="text"
                  class="form-control"
                  id="zip_code"
                  aria-describedby="nameHelp"
                >
              </div>
              <br><label for="phone_number">Numero de téléphone</label>
              <input
                v-model="employee.phone_number"
                type="text"
                class="form-control"
                id="phone_number"
                aria-describedby="nameHelp"
              >
              <br><label for="email">Email</label>
              <input
                v-model="employee.email"
                type="text"
                class="form-control"
                id="email"
                aria-describedby="nameHelp"
              >
              <br><label for="position">Poste</label>
              <select v-model="employee.position" class="form-control" id="position">
                <option>Project Manager</option>
                <option>Developer</option>
                <option>Commercial</option>
                <option>Web Designer</option>
              </select>
            </div>
          </form>

          <button class="btn btn-primary" v-if="!this.employee._id" @click="createEmployee()">
            <span>Créer</span>
          </button>
          <button class="btn btn-primary" v-if="this.employee._id" @click="updateEmployee()">
            <span>Mettre à jour</span>
          </button>
          <button class="btn btn-primary" @click="newEmployee()">Vider les champs</button>
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
  name: "CU_Employee",

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
      employee: {},
      address : {
          street : '',
          city :  '',
          zip_code: ''
      },
    };
  },

  methods: {
    createEmployee() {
      this.employee.address = this.address;
      apiService.createEmployee(this.employee).then(
        result => {
          console.log(result);
          if (result.status === 200) {
            this.employee = result.data;
            console.log(result.status)
            alert("Employee created");
            this.$router.push('/employees')
          }
        },
        error => {
          this.showError = true;
          console.log(error);
        }
      );
    },
    updateEmployee() {
      this.employee.address = this.address;
      console.log(this.employee.company_name);
      apiService.updateEmployee(this.employee).then(
        result => {
          console.log(result);
          alert("Employee updated");
          this.$router.push('/employees')
        },
        error => {
          this.showError = true;
        }
      );
    },
    newEmployee() {
      this.employee = {};
    }
  },

  mounted() {
    if (this.$route.params.id != ':id') {
      apiService.getEmployee(this.$route.params.id).then(employee => {
        this.updateMode = true;
        this.employee = employee;
        this.address = employee.address;
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
