<template>
  <main>
    <ListItem :items="usersList" />
  </main>
</template>

<script setup lang="ts">
import ListItem from '@/components/ListItem.vue'
import { generateUsers } from '@/api/UserDataFaker'
import { ref } from 'vue'

const usersList = ref(generateUsers(10))
</script>

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
