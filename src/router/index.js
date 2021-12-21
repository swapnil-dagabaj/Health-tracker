import Vue from "vue";
import VueRouter from 'vue-router';
import ContactList from '../components/ContactList.vue';
import NewContact from '../components/NewContact.vue';

Vue.use(VueRouter);

const routes = [
    { path: "/", component: ContactList },
    { path: "/add-contact", component: NewContact },
    { path: "/edit-contact/:id", component: NewContact }
];

const router = new VueRouter({
    mode: "history",
    base: "/",
    routes,
})

export default router;