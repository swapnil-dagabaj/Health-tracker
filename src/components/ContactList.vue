<template>
  <div class="hello">
    <div class="add-contact-link">
      <RouterLink to="add-contact"> Click Here To Add New Contact </RouterLink>
    </div>

    <div class="contact-list-table">
      <span>Contact list Information</span>
      <table class="table">
        <thead>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone No</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </thead>
        <tbody>
          <tr v-for="contact in contactList" :key="contact.id">
            <td>{{ contact.firstName }}</td>
            <td>{{ contact.lastName }}</td>
            <td>{{ contact.email }}</td>
            <td>{{ contact.phoneNo }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="editContact(contact.id)"
              >
                Edit
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-primary"
                @click="deleteContact(contact.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ContactList",
  props: {
    msg: String,
  },
  data() {
    return {
      contactList: [],
    };
  },
  created() {
    this.fetchContacts();
  },
  methods: {
    fetchContacts() {
      axios({
        url: `https://localhost:44353/api/contacts`,
      })
        .then((response) => {
          this.contactList = response.data;
        })
        .catch((exception) => {
          console.log(exception);
        });
    },
    editContact(value) {
      this.$router.push({ path: `edit-contact/${value}` });
    },
    deleteContact(value) {
      axios({
        url: `https://localhost:44353/api/contacts/${parseInt(value)}`,
        method: "delete",
      })
        .then((response) => {
          const id = response.data.id;
          this.contactList = this.contactList.filter(
            (c) => c.id !== parseInt(id)
          );
        })
        .catch((exception) => {
          console.log(exception);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.contact-list-table {
  margin-top: 20px;
  background-color: beige;
}
.table {
  margin-top: 10px;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.table td,
#table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:hover {
  background-color: #ddd;
}

.table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #04aa6d;
  color: white;
}
</style>
