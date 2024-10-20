<script setup lang="ts">
import RegisterForm from './components/RegisterForm.vue'
import WinnersBlock from './components/WinnersBlock.vue'
</script>

<template>
  <header><WinnersBlock></WinnersBlock></header>
  <main><RegisterForm></RegisterForm></main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
