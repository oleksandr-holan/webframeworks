<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title text-uppercase">
              <strong>Register form</strong>
            </h5>
            <p class="card-text text-muted">Please fill in all the fields.</p>
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="name" class="form-label"
                  ><strong>Name</strong></label
                >
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
                  type="text"
                  class="form-control"
                  id="dob"
                  v-model="form.dob"
                  placeholder="mm/dd/yyyy"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label"
                  ><strong>Email</strong></label
                >
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  dob: '',
  email: '',
  phone: '',
})

const submitForm = () => {
  // Handle form submission
  console.log(form)
  // Reset form after submission
  Object.assign(form, {
    name: '',
    dob: '',
    email: '',
    phone: '',
  })
}
</script>
