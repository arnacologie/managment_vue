<template>
  <div id="container" class="container">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="alert alert-warning" v-show="showError">
          <button type="button" class="close" @click="hideMessage()">X</button>
          <strong>Erreur!</strong>
        </div>
        <h1>Créer un client</h1>

        <div class="info-form">
          <form>
            <div class="form-group">
              <label for="name">Nom de l'entreprise</label>
              <input
                v-model="client.company_name"
                type="text"
                class="form-control"
                id="company_name"
                aria-describedby="nameHelp"
              >
              <br><label for="name">Adresse</label>
              <div v-if="this.updateMode">
                <div v-for="(item, index) in client.address" :key="index">
                  <div v-if="index == 'street'">
                    <small id="nameHelp" class="form-text text-muted">Rue</small>
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
              <br><label for="name">Contact Référent</label>
              <small id="nameHelp" class="form-text text-muted">Prénom du référent</small>
              <input
                v-model="referent_contact.first_name"
                type="text"
                class="form-control"
                id="first_name"
                aria-describedby="nameHelp"
              >
              <small id="nameHelp" class="form-text text-muted">Nom du référent</small>
              <input
                v-model="referent_contact.family_name"
                type="text"
                class="form-control"
                id="family_name"
                aria-describedby="nameHelp"
              >
              <small id="nameHelp" class="form-text text-muted">Numéro du référent</small>
              <input
                v-model="referent_contact.phone_number"
                type="text"
                class="form-control"
                id="phone_number"
                aria-describedby="nameHelp"
              >
              <small id="nameHelp" class="form-text text-muted">Mail du référent</small>
              <input
                v-model="referent_contact.mail"
                type="text"
                class="form-control"
                id="mail"
                aria-describedby="nameHelp"
              >
              <br><label for="name">Secteur d'activité</label>
              <input
                v-model="client.business_sector"
                type="text"
                class="form-control"
                id="business_sector"
                aria-describedby="nameHelp"
              >
            </div>
          </form>

          <button class="btn btn-primary" v-if="!this.client._id" @click="createClient()">
            <span>Créer</span>
          </button>
          <button class="btn btn-primary" v-if="this.client._id" @click="updateClient()">
            <span>Mettre à jour</span>
          </button>
          <button class="btn btn-primary" @click="newClient()">Vider les champs</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { APIService } from "../APIService";

const apiService = new APIService();

export default {
  name: "CU_Client",

  components: {},

  data() {
    return {
      updateMode : false,
      showError: false,
      client: {},
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
    createClient() {
      this.client.address = this.address;
      this.client.referent_contact = this.referent_contact;
      
      apiService.createClient(this.client).then(
        result => {
          console.log(result);
          if (result.status === 200) {
            this.client = result.data;
            console.log(result.status)
            alert("Client created");
            this.$router.push('/clients')
          }
        },
        error => {
          this.showError = true;
          console.log(error);
        }
      );
    },
    updateClient() {
      this.client.address = this.address;
      this.client.referent_contact = this.referent_contact;
      console.log(this.client.company_name);
      apiService.updateClient(this.client).then(
        result => {
          console.log(result);
          alert("Client updated");
          this.$router.push('/clients')
        },
        error => {
          this.showError = true;
        }
      );
    },
    newClient() {
      this.client = {};
    }
  },

  mounted() {
    if (this.$route.params.id != ':id') {
      apiService.getClient(this.$route.params.id).then(client => {
        this.updateMode = true;
        this.client = client;
        this.address = client.address;
        this.referent_contact = client.referent_contact;
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
