<script setup lang="ts">
import { ref, useTemplateRef, computed } from 'vue'
import type { IUser } from '@/models/User'
import * as Validator from '@/validations/UserValidations'
import { faker } from '@faker-js/faker'
import type { ValidationRules } from '@/types/validation'

// TODO: adjust winner pill width according to the name length
const users = ref<IUser[]>([])
const loosers = computed(() => {
  return users.value.map(user => user.name)
})
const winners = ref<string[]>([])
const newUser = ref<IUser>(initEmptyUser())
const wasValidated = ref(false)
const userForm = useTemplateRef('userForm')
const userFormInputs = {
  name: useTemplateRef('userFormInputs.name'),
  email: useTemplateRef('userFormInputs.email'),
  dateOfBirth: useTemplateRef('userFormInputs.dateOfBirth'),
  phone: useTemplateRef('userFormInputs.phone'),
}
const isNewWinnerAvailable = computed(() => {
  return loosers.value.length && winners.value.length <= 3
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

const validationRules: ValidationRules = {
  name: [{ validator: Validator.isNotEmpty, message: 'Name is required' }],
  email: [
    { validator: Validator.isNotEmpty, message: 'Email is required' },
    { validator: Validator.isValidEmail, message: 'Invalid email format' },
  ],
  dateOfBirth: [
    { validator: Validator.isNotEmpty, message: 'Date of Birth is required' },
    {
      validator: Validator.isDateInPast,
      message: 'Date of birth cannot be in the future',
    },
  ],
  phone: [
    { validator: Validator.isNotEmpty, message: 'Phone number is required' },
    {
      validator: Validator.isValidPhone,
      message: 'Invalid phone number format',
    },
  ],
}

const validateField = (field: keyof IUser, value: string): string => {
  for (const rule of validationRules[field]) {
    if (!rule.validator(value)) {
      return rule.message
    }
  }
  return ''
}

const validateForm = (): boolean => {
  ;(Object.keys(validationRules) as Array<keyof IUser>).forEach(field => {
    const errorMessage = validateField(field, newUser.value[field])
    userFormInputs[field].value?.setCustomValidity(errorMessage)
  })

  return userForm.value?.checkValidity() ?? false
}

function onSubmit(user: IUser) {
  users.value.push(user)
}

function resetForm() {
  newUser.value = initEmptyUser()
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
            <div class="invalid-feedback">
              {{ userFormInputs.dateOfBirth.value?.validationMessage }}
            </div>
            <div class="valid-feedback">Looks good!</div>
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
            <div class="invalid-feedback">
              {{ userFormInputs.email.value?.validationMessage }}
            </div>
            <div class="valid-feedback">Looks good!</div>
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
            <div class="invalid-feedback">
              {{ userFormInputs.phone.value?.validationMessage }}
            </div>
            <div class="valid-feedback">Looks good!</div>
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
