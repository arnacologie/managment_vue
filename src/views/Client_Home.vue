<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Clients/>
  </div>
</template>

<script>
// @ is an alias to /src
import Clients from '@/components/Clients.vue'

export default {
  name: 'client_home',
  components: {
    Clients
  }
}
</script>