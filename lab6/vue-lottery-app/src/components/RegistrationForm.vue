<template>
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
            v-model="user.name"
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
            v-model="user.dateOfBirth"
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
            v-model="user.email"
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
            v-model="user.phone"
            placeholder="Enter Phone number"
          />
          <div class="invalid-feedback" v-if="errors.phone">
            {{ userFormInputs.phone.value?.validationMessage }}
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, useTemplateRef, onMounted } from 'vue'
import type { IUser } from '@/models/User'
import * as Validator from '@/validations/UserValidations'

const user = reactive<IUser>(initUser())
const errors = reactive<IUser>(initUser())
const wasValidated = ref(false)
const userForm = useTemplateRef('userForm')
const userFormInputs = {
  name: useTemplateRef('userFormInputs.name'),
  email: useTemplateRef('userFormInputs.email'),
  dateOfBirth: useTemplateRef('userFormInputs.dateOfBirth'),
  phone: useTemplateRef('userFormInputs.phone'),
}

onMounted(() => {
  console.log(userFormInputs.phone.value)
})

function initUser(): IUser {
  return {
    name: '',
    email: '',
    dateOfBirth: '',
    phone: '',
  }
}

const emit = defineEmits<{
  submit: [user: IUser]
}>()

const validateForm = () => {
  Object.assign(errors, initUser())

  if (!Validator.isNotEmpty(user.name)) {
    errors.name = 'Name is required'
    userFormInputs.name.value?.setCustomValidity(errors.name)
  }

  if (!Validator.isNotEmpty(user.email)) {
    errors.email = 'Email is required'
    userFormInputs.email.value?.setCustomValidity(errors.email)
  } else if (!Validator.isValidEmail(user.email)) {
    errors.email = 'Invalid email format'
    userFormInputs.email.value?.setCustomValidity(errors.email)
  }

  if (!Validator.isNotEmpty(user.dateOfBirth)) {
    errors.dateOfBirth = 'Date of Birth is required'
    userFormInputs.dateOfBirth.value?.setCustomValidity(errors.dateOfBirth)
  } else if (!Validator.isDateInPast(user.dateOfBirth)) {
    errors.dateOfBirth = 'Date of birth cannot be in the future'
    userFormInputs.dateOfBirth.value?.setCustomValidity(errors.dateOfBirth)
  }

  if (!Validator.isNotEmpty(user.phone)) {
    errors.phone = 'Phone number is required'
    userFormInputs.phone.value?.setCustomValidity(errors.phone)
  } else if (!Validator.isValidPhone(user.phone)) {
    errors.phone = 'Invalid phone number format'
    userFormInputs.phone.value?.setCustomValidity(errors.phone)
  }
  return userForm.value?.checkValidity()
}

function resetForm() {
  Object.assign(user, initUser())
  Object.assign(errors, initUser())
  wasValidated.value = false
}

function submitForm() {
  if (validateForm()) {
    emit('submit', user)
    resetForm()
    return
  }
  wasValidated.value = true
}
</script>

<style scoped></style>
