<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Employees/>
  </div>
</template>

<script>
// @ is an alias to /src
import Employees from '@/components/Employees.vue'

export default {
  name: 'employee_home',
  components: {
    Employees
  }
}
</script>