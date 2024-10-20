<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title text-uppercase"><strong>Register form</strong></h5>
      <p class="card-text">Please fill in all the fields.</p>
      <form @submit.prevent="props.onSubmit">
        <div class="mb-3">
          <label for="name" class="form-label"><strong>Name</strong></label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="form.name"
            placeholder="Enter user name"
          />
        </div>
        <div class="mb-3">
          <label for="dob" class="form-label"
            ><strong>Date of Birth</strong></label
          >
          <input
            type="date"
            class="form-control"
            id="dob"
            v-model="form.dateOfBirth"
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label"><strong>Email</strong></label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="form.email"
            placeholder="Enter email"
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label"
            ><strong>Phone number</strong></label
          >
          <input
            type="tel"
            class="form-control"
            id="phone"
            v-model="form.phone"
            placeholder="Enter Phone number"
          />
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { IUser } from '@/models/User'

const props = defineProps<{
  onSubmit: () => void
}>()

const form = reactive<IUser>({
  name: '',
  dateOfBirth: '',
  email: '',
  phone: '',
})
</script>

<style scoped></style>
