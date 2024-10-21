<template>
  <li class="user-card" :class="{ underage: isUnderage }">
    <img
      :src="props.userData.photo"
      :alt="props.userData.firstName"
      class="user-photo"
    />
    <div class="user-info">
      <h2>{{ props.userData.firstName }} {{ props.userData.lastName }}</h2>
      <p><strong>Gender:</strong> {{ props.userData.gender }}</p>
      <p v-if="!isUnderage"><strong>Age:</strong> {{ props.userData.age }}</p>
      <p><strong>Position:</strong> {{ props.userData.position }}</p>
      <div class="hobbies">
        <strong>Hobbies:</strong>
        <ul>
          <li v-for="hobby in props.userData.hobbies" :key="hobby">
            {{ hobby }}
          </li>
        </ul>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { UserData } from '@/types/UserData'
import { computed } from 'vue'

const props = defineProps<{ userData: UserData }>()
const isUnderage = computed(
  () => props.userData.age !== undefined && props.userData.age < 18,
)
</script>

<style scoped>
.user-card {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  background-color: var(--color-background-soft);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;
}

.user-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-color: var(--color-border-hover);
}

.user-card.underage {
  background-color: var(--color-underage);
}

.user-photo {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.user-info {
  flex: 1;
}

h2 {
  margin-top: 0;
  margin-bottom: 10px;
  color: var(--color-heading);
  font-size: 1.5rem;
}

p {
  margin: 5px 0;
  color: var(--color-text);
}

.hobbies {
  margin-top: 10px;
}

.hobbies ul {
  padding-left: 20px;
  margin: 5px 0;
}

.hobbies li {
  color: var(--color-text-soft);
}
</style>
