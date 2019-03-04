<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Stats msg="Statistiques globales"/>
  </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import Stats from '@/components/Stats.vue'

export default {
  name: 'home',
  components: {
    Stats
  }
}
</script>
