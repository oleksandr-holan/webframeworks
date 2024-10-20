<template>
  <div class="register-form-container container">
    <p class="fw-bold text-uppercase">Register form</p>
    <p class="text-secondary">Please fill in all the fields</p>
    <form>
      <div class="mb-3">
        <label for="username" class="form-label fw-bold">Name</label>
        <input
          type="text"
          class="form-control bg-gray"
          name="username"
          id="username"
          aria-describedby="helpId"
          placeholder="Enter user name"
        />
      </div>

      <label for="username">Name</label><br />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter user name"
      /><br />
      <label for="date-of-birth">Date of Birth</label><br />
      <input
        type="date"
        name="date of birth"
        id="date-of-birth"
        placeholder="mm/dd/yyyy"
      /><br />
      <label for="email">Email</label><br />
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Enter email"
      /><br />
      <label for="phone-number">Phone number</label><br />
      <input
        type="text"
        name="phone number"
        id="phone-number"
        placeholder="Enter phone name"
      /><br />
    </form>
  </div>
</template>
