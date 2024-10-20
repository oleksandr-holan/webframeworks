<template>
  <div class="mb-4">
    <div class="input-group">
      <div
        class="bg-white border rounded-start p-2 d-flex align-items-center flex-grow-1"
      >
        <ul class="list-unstyled m-0 d-flex flex-wrap gap-2">
          <li v-for="winner in winners" :key="winner">
            <span class="badge bg-info text-dark d-flex align-items-center">
              {{ winner }}
              <button
                type="button"
                class="btn-close btn-close-white ms-2"
                aria-label="Close"
                @click="removeWinner(winner)"
              ></button>
            </span>
          </li>
        </ul>
      </div>
      <button class="btn btn-primary" type="button" @click="getNewWinner">
        New winner
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ userNames: string[] }>()
const winners = ref<string[]>([])
const loosers = ref(props.userNames)

function getNewWinner() {
  const winnerIndex = Math.floor(Math.random() * loosers.value.length)
  winners.value.push(loosers.value[winnerIndex])
  loosers.value.splice(winnerIndex, 1)
}

function removeWinner(username: string) {
  winners.value.filter(winner => username !== winner)
  loosers.value.push(username)
}
</script>
