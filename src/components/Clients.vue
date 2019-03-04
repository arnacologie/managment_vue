<template>
  <div>
    <h1>Liste des clients</h1>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Nom de l'entreprise</th>
          <th>Adresse</th>
          <th>Contact Référent</th>
          <th>Secteur d'activité</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client._id">
          <th></th>
          <td>{{client.company_name}}</td>
          <td><p v-for="item in client.address" :key="item">{{item}} </p></td>
          <td><p v-for="item in client.referent_contact" :key="item">{{item}} </p></td>
          <td>{{client.business_sector}}</td>
          <td>
            <button class="btn btn-danger" @click="deleteClient(client)">X</button>
            <a class="btn btn-primary" v-bind:href="'/clients/create/' + client._id">&#9998;</a>
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
  name: "Clients",

  components: {},

  data() {
    return {
      clients: [],
    };
  },

  methods: {
    getClients() {
      apiService.getClients().then(data => {
        this.clients = data;
      });
    },
    deleteClient(client) {
      apiService.deleteClient(client).then(r => {
        if (r.status === 200) {
          alert("Todo deleted");
          this.getClients();
        }
        console.log(r.status);
      });
    }
  },

  mounted() {
    this.getClients();
    console.log("CLIENTS = "+this.clients.data)
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
