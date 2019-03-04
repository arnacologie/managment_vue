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
                v-model="company_name"
                type="text"
                class="form-control"
                id="company_name"
                aria-describedby="nameHelp"
              >
              <br><label for="name">Adresse</label>
              <small id="nameHelp" class="form-text text-muted">Nom de rue</small>
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
              <small id="nameHelp" class="form-text text-muted">Code postal</small>
              <input
                v-model="address.zip_code"
                type="text"
                class="form-control"
                id="zip_code"
                aria-describedby="nameHelp"
              >
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
                v-model="business_sector"
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
      showError: false,
      client: {},
      company_name: '',
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
      },
      business_sector : ''
      };
  },

  methods: {
    createClient() {
      this.client = {
        company_name: this.company_name,
        address : {
            street : this.address.street,
            city :  this.address.city,
            zip_code: this.address.zip_code
        },
        referent_contact : {
            first_name : this.referent_contact.first_name,
            family_name : this.referent_contact.family_name,
            phone_number : this.referent_contact .phone_number,
            mail : this.referent_contact.mail
        },
        business_sector : this.business_sector
      };
      
      apiService.createClient(this.client).then(
        result => {
          console.log(result);
          if (result.status === 200) {
            this.client = result.data;
            console.log(result.status)
            alert("Client created");
          }
        },
        error => {
          this.showError = true;
          console.log(error);
        }
      );
    },
    updateClient() {
      apiService.updateClient(this.client).then(
        result => {
          console.log(result);
          alert("Client updated");
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
        this.client = client;
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
