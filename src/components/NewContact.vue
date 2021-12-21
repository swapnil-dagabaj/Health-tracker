<template>
  <div class="contactForm">
    <h2>{{ message }}</h2>
    <br />
    <div class="formElement">

      <h4> {{ errorMessage }}</h4>
      <label for="exampleFormControlInput1" class="form-label"
        >First Name</label
      >
      <input
        ref="firstName"
        type="input"
        class="form-control"
        placeholder="Enter First Name"
      />
    </div>

    <div class="formElement">
      <label for="exampleFormControlInput1" class="form-label">Last Name</label>
      <input
        type="input"
        class="form-control"
        ref="lastName"
        placeholder="Enter Last Name"
      />
    </div>

    <div class="formElement">
      <label for="exampleFormControlInput1" class="form-label"
        >Email address</label
      >

      <input
        type="email"
        class="form-control"
        ref="emailId"
        placeholder="Enter Email Address"
      />
    </div>
    <div class="formElement">
      <label for="exampleFormControlInput1" class="form-label">Phone No</label>

      <input
        type="input"
        class="form-control"
        ref="phoneNo"
        placeholder="Enter Phone No"
      />
    </div>
    <button type="button" class="btn btn-primary" @click="submitContact">
      Submit
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NewContact",
  props: {},
  data() {
    return {
      message: 'New Contact',
      errorMessage: '',
    };
  },
  created() {
    if (this.$route.params) {
      this.message = 'Edit Contact';
      this.getContact(this.$route.params.id);
    }
  },
  methods: {
    submitContact() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        const data = {
          FirstName: this.$refs.firstName.value,
          LastName: this.$refs.lastName.value,
          Email: this.$refs.emailId.value,
          PhoneNo: this.$refs.phoneNo.value,
        };
        this.updateContact(id, data);
      } else {
        this.addNewContact();
      }
    },
    addNewContact() {
      const data = {
        FirstName: this.$refs.firstName.value,
        LastName: this.$refs.lastName.value,
        Email: this.$refs.emailId.value,
        PhoneNo: this.$refs.phoneNo.value,
      };
      axios({
        url: "https://localhost:44353/api/contacts",
        method: "post",
        data,
      })
        .then((response) => {
          if (response.status === 201) {
            this.$router.push({ path: "/" });
          }
        })
        .catch((exception) => {
          console.log(exception);
        });
    },
    async getContact(id) {
      const response = await axios({
        url: `https://localhost:44353/api/contacts/${parseInt(id)}`,
      });
      if (response.status === 200) {
        const { firstName, lastName, email, phoneNo } = response.data;
        this.$refs.firstName.value = firstName;
        this.$refs.lastName.value = lastName;
        this.$refs.emailId.value = email;
        this.$refs.phoneNo.value = phoneNo;
      }
    },
    async updateContact(id, data) {
      try {
        const response = await axios({
          url: `https://localhost:44353/api/contacts/${parseInt(id)}`,
          method: "put",
          data,
        });
        if (response.status === 204) {
          this.$router.push({ path: "/" });
        }
      } catch (exception) {
        console.log(exception);
      }
    },
  },
};
</script>

<style scoped>
.formElement {
  margin: 20px;
}

input {
  width: 300px;
}

input {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.contactForm {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

label {
  margin: 10px;
}
button {
  width: 150px;
  height: 50px;
  background-color: beige;
}
</style>
