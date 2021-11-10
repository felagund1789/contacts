<template>
  <v-app>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary"
      dark
      app
      fixed
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <span class="hidden-sm-and-down">Contacts</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        label="Search"
        class="hidden-sm-and-down"
        v-model="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout v-if="item.heading" :key="item.heading" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
          >
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i">
              <v-list-item-action>
                <v-icon>mdi-{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="child.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text">
            <v-list-item-action>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <contacts-grid
        fill-height
        :search-text="search"
        @edit="editContact"
      ></contacts-grid>
    </v-main>
    <v-btn fab bottom right color="accent" dark fixed @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      :hide-overlay="$vuetify.breakpoint.mdAndDown"
      :fullscreen="$vuetify.breakpoint.mdAndDown"
      v-model="dialog"
      width="800px"
      persistent
      scrollable
    >
      <edit-contact v-model="selectedItem" @close="closeDialog"></edit-contact>
    </v-dialog>
  </v-app>
</template>

<script>
import ContactsGrid from "./components/ContactsGrid.vue";
import EditContact from "./components/EditContact.vue";

export default {
  components: { ContactsGrid, EditContact },
  data: () => ({
    search: "",
    selectedItem: {},
    dialog: false,
    drawer: null,
    items: [
      { icon: "contacts", text: "Contacts" },
      { icon: "history", text: "Frequently contacted" },
      { icon: "content-copy", text: "Duplicates" },
      {
        icon: "keyboard-arrow-up",
        "icon-alt": "keyboard-arrow-down",
        text: "Labels",
        model: true,
        children: [{ icon: "plus", text: "Create label" }]
      },
      {
        icon: "keyboard-arrow-up",
        "icon-alt": "keyboard-arrow-down",
        text: "More",
        model: false,
        children: [
          { text: "Import" },
          { text: "Export" },
          { text: "Print" },
          { text: "Undo changes" },
          { text: "Other contacts" }
        ]
      },
      { icon: "cog", text: "Settings" },
      { icon: "message-alert", text: "Send feedback" },
      { icon: "help", text: "Help" },
      { icon: "cellphone-link", text: "App downloads" },
      { icon: "keyboard", text: "Go to the old version" }
    ]
  }),
  methods: {
    editContact(contact) {
      this.selectedItem = Object.assign({}, contact);
      this.dialog = true;
    },
    closeDialog() {
      this.selectedItem = {};
      this.dialog = false;
    }
  }
};
</script>
