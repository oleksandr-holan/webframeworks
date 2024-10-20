<script setup lang="ts">
import RegistrationForm from './components/RegistrationForm.vue'
import WinnersBlock from './components/WinnersBlock.vue'
import UsersTable from './components/UsersTable.vue'
</script>

<template>
  <div class="container mt-5 custom-container">
    <WinnersBlock />
    <RegistrationForm />
    <UsersTable />
  </div>
</template>

<style scoped>
.custom-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
