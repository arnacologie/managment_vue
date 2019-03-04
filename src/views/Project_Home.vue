<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Projects/>
  </div>
</template>

<script>
/* eslint-disable */
// @ is an alias to /src
import Projects from '@/components/Projects.vue'

export default {
  name: 'project_home',
  components: {
    Projects
  }
}
</script>