se<template>
  <v-data-table
    fixed-header
    :headers="headers"
    :items="contacts"
    :options.sync="contactOptions"
    :server-items-length="totalContacts"
    :loading="loading"
    :footer-props="footerProps"
    @click:row="viewContact"
  >
    <template v-slot:[`item.url`]="{ item }">
      <v-avatar size="36" :color="randomColor()">
        <v-img v-if="item.url" :src="item.url"></v-img>
        <span v-if="!item.url" class="white--text"
          >{{ item.firstname.substring(0, 1)
          }}{{ item.lastname.substring(0, 1) }}
        </span>
      </v-avatar>
    </template>
    <template v-slot:[`item.firstname`]="{ item }">
      {{ item.firstname }} {{ item.lastname }}
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import ContactService from "../services/ContactService";

export default {
  props: {
    searchText: String,
    showDialog: Boolean
  },

  data: () => ({
    dialog: false,
    search: "",
    loading: false,
    headers: [
      { text: "", value: "url", width: 100 },
      { text: "Name", value: "firstname" },
      { text: "Company", value: "company" },
      { text: "Job title", value: "position" },
      { text: "E-mail address", value: "email" },
      { text: "Phone number", value: "phone" },
      { text: "", value: "actions", sortable: false, width: 100 }
    ],
    colors: [
      "red",
      "pink",
      "purple",
      "deep-purple",
      "indigo",
      "blue",
      "light-blue",
      "cyan",
      "teal",
      "green",
      "light-green",
      "amber",
      "orange",
      "deep-orange",
      "brown",
      "blue-grey"
    ],
    contacts: [],
    totalContacts: 0,
    footerProps: {
      // disableItemsPerPage: true
    },
    contactOptions: {
      page: 1,
      itemsPerPage: 10
    },
    selectedId: null,
    selectedItem: {
      id: null,
      firstname: "",
      lastname: "",
      url: ""
    },
    defaultItem: {
      id: null,
      firstname: "",
      lastname: "",
      url: ""
    }
  }),

  watch: {
    showDialog(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (!val) {
        this.close();
      }
      this.$emit("input", val);
    },
    contactOptions() {
      this.getContacts();
    },
    search() {
      this.getContacts();
    }
  },

  activated() {
    if (this.searchText) {
      this.search = this.searchText;
    }
  },

  methods: {
    async getContacts() {
      this.loading = true;
      let response = await ContactService.getAll(this.contactOptions);
      this.contacts = response._embedded.contacts;
      this.totalContacts = parseInt(response.page.totalElements);
      this.loading = false;
    },

    viewContact(item) {
      this.selectedId = item.id;
      this.selectedItem = Object.assign({}, item);
      this.$emit("view", this.selectedItem);
    },

    randomColor() {
      return this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  }
};
</script>
