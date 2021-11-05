import Vue from "vue";
import VueRouter from "vue-router";
import ContactsGrid from "../components/ContactsGrid";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/contacts"
  },
  {
    path: "/contacts",
    name: "contacts",
    component: ContactsGrid
  }
];

const router = new VueRouter({
  routes
});

export default router;
