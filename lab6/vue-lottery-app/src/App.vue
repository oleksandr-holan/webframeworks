<script setup lang="ts">
import { ref, useTemplateRef, computed } from 'vue'
import type { IUser } from '@/models/User'
import * as Validator from '@/validations/UserValidations'
import { faker } from '@faker-js/faker'

// TODO: adjust winner pill width according to the name length
const users = ref<IUser[]>([])
const loosers = computed(() => {
  return users.value.map(user => user.name)
})
const winners = ref<string[]>([])
const newUser = ref<IUser>(initEmptyUser())
const errors = ref<IUser>(initEmptyUser())
const wasValidated = ref(false)
const userForm = useTemplateRef('userForm')
const userFormInputs = {
  name: useTemplateRef('userFormInputs.name'),
  email: useTemplateRef('userFormInputs.email'),
  dateOfBirth: useTemplateRef('userFormInputs.dateOfBirth'),
  phone: useTemplateRef('userFormInputs.phone'),
}
const isNewWinnerAvailable = computed(() => {
  if (winners.value.length >= 3) return false
  if (!loosers.value.length) return false
  return true
})

function generateRandomUser(): IUser {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    dateOfBirth: faker.date.past({ years: 50 }).toISOString().split('T')[0],
    phone: faker.phone.number({ style: 'international' }),
  }
}

function addRandomUser() {
  const randomUser = generateRandomUser()
  users.value.push(randomUser)
}

function getNewWinner() {
  const winnerIndex = Math.floor(Math.random() * loosers.value.length)
  winners.value.push(loosers.value[winnerIndex])
  loosers.value.splice(winnerIndex, 1)
}

function removeWinner(username: string) {
  console.log(username)
  winners.value = winners.value.filter(winner => username !== winner)
  loosers.value.push(username)
}

function initEmptyUser(): IUser {
  return {
    name: '',
    email: '',
    dateOfBirth: '',
    phone: '',
  }
}

const validateForm = () => {
  errors.value = initEmptyUser()

  if (!Validator.isNotEmpty(newUser.value.name)) {
    errors.value.name = 'Name is required'
    userFormInputs.name.value?.setCustomValidity(errors.value.name)
  }

  if (!Validator.isNotEmpty(newUser.value.email)) {
    errors.value.email = 'Email is required'
    userFormInputs.email.value?.setCustomValidity(errors.value.email)
  } else if (!Validator.isValidEmail(newUser.value.email)) {
    errors.value.email = 'Invalid email format'
    userFormInputs.email.value?.setCustomValidity(errors.value.email)
  }

  if (!Validator.isNotEmpty(newUser.value.dateOfBirth)) {
    errors.value.dateOfBirth = 'Date of Birth is required'
    userFormInputs.dateOfBirth.value?.setCustomValidity(
      errors.value.dateOfBirth,
    )
  } else if (!Validator.isDateInPast(newUser.value.dateOfBirth)) {
    errors.value.dateOfBirth = 'Date of birth cannot be in the future'
    userFormInputs.dateOfBirth.value?.setCustomValidity(
      errors.value.dateOfBirth,
    )
  }

  if (!Validator.isNotEmpty(newUser.value.phone)) {
    errors.value.phone = 'Phone number is required'
    userFormInputs.phone.value?.setCustomValidity(errors.value.phone)
  } else if (!Validator.isValidPhone(newUser.value.phone)) {
    errors.value.phone = 'Invalid phone number format'
    userFormInputs.phone.value?.setCustomValidity(errors.value.phone)
  }
  return userForm.value?.checkValidity()
}

function onSubmit(user: IUser) {
  users.value.push(user)
}

function resetForm() {
  newUser.value = initEmptyUser()
  errors.value = initEmptyUser()
  wasValidated.value = false
}

function submitForm() {
  if (validateForm()) {
    onSubmit(newUser.value)
    resetForm()
    return
  }
  wasValidated.value = true
}
</script>

<template>
  <div class="container mt-5 custom-container">
    <!-- Winners Block  -->
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
                  class="btn-close ms-2"
                  aria-label="Close"
                  @click="removeWinner(winner)"
                ></button>
              </span>
            </li>
          </ul>
        </div>
        <button
          class="btn btn-primary"
          type="button"
          @click="isNewWinnerAvailable && getNewWinner()"
          :disabled="!isNewWinnerAvailable"
        >
          New winner
        </button>
      </div>
    </div>
    <!-- Registration form -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title text-uppercase">
          <strong>Registration form</strong>
        </h5>
        <p class="card-text">Please fill in all the fields.</p>
        <form
          ref="userForm"
          class="needs-validation"
          :class="{ 'was-validated': wasValidated }"
          @submit.prevent.stop="submitForm"
          novalidate
        >
          <div class="mb-3">
            <label for="name" class="form-label"><strong>Name</strong></label>
            <input
              ref="userFormInputs.name"
              type="text"
              class="form-control"
              id="name"
              v-model="newUser.name"
              placeholder="Enter user name"
            />
            <div class="invalid-feedback">
              {{ userFormInputs.name.value?.validationMessage }}
            </div>
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="mb-3">
            <label for="dob" class="form-label"
              ><strong>Date of Birth</strong></label
            >
            <input
              ref="userFormInputs.dateOfBirth"
              type="date"
              class="form-control"
              id="dob"
              v-model="newUser.dateOfBirth"
            />
            <div class="invalid-feedback" v-if="errors.dateOfBirth">
              {{ userFormInputs.dateOfBirth.value?.validationMessage }}
            </div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label"><strong>Email</strong></label>
            <input
              ref="userFormInputs.email"
              type="email"
              class="form-control"
              id="email"
              v-model="newUser.email"
              placeholder="Enter email"
            />
            <div class="invalid-feedback" v-if="errors.email">
              {{ userFormInputs.email.value?.validationMessage }}
            </div>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label"
              ><strong>Phone number</strong></label
            >
            <input
              ref="userFormInputs.phone"
              type="tel"
              class="form-control"
              id="phone"
              v-model="newUser.phone"
              placeholder="Enter Phone number"
            />
            <div class="invalid-feedback" v-if="errors.phone">
              {{ userFormInputs.phone.value?.validationMessage }}
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
          <button
            type="button"
            class="btn btn-secondary ms-2"
            @click="addRandomUser"
          >
            Add Random User
          </button>
        </form>
      </div>
    </div>

    <!-- Users Table -->
    <div class="card">
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Phone number</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.dateOfBirth }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
