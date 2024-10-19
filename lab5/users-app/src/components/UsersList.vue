<template>
  <div class="list-container">
    <div class="filter-buttons">
      <button @click="gender = 'male'" :class="{ active: gender === 'male' }">
        Male
      </button>
      <button
        @click="gender = 'female'"
        :class="{ active: gender === 'female' }"
      >
        Female
      </button>
      <button @click="gender = ''" :class="{ active: gender === '' }">
        All
      </button>
    </div>
    <ul class="user-list">
      <template v-for="item in filteredItems" :key="item.id">
        <UserItem :user-data="item"></UserItem>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { UserData } from '@/types/UserData'
import UserItem from '@/components/UserItem.vue'

const gender = ref('')
const props = defineProps<{ items: UserData[] }>()

const filteredItems = computed(() => {
  return gender.value
    ? props.items.filter(user => user.gender === gender.value)
    : props.items
})
</script>

<style scoped>
.list-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.filter-buttons button {
  background-color: var(--color-button);
  color: var(--color-button-text);
  border: 1px solid var(--color-border);
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.filter-buttons button.active {
  background-color: var(--color-button-active);
  color: var(--color-button-text-active);
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-list > * {
  margin-bottom: 20px;
}
</style>
