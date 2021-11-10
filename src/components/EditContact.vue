<template>
  <v-card>
    <v-card-title class="primary white--text py-4 title">
      {{ formTitle }}
    </v-card-title>
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field
            prepend-icon="mdi-account-circle"
            v-model="contact.firstname"
            placeholder="First name"
          >
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field v-model="contact.lastname" placeholder="Last name">
          </v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="contact.company"
            prepend-icon="mdi-domain"
            placeholder="Company"
          ></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            v-model="contact.position"
            placeholder="Job title"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="contact.address"
            prepend-icon="mdi-home"
            placeholder="Address"
          ></v-text-field>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            v-model="contact.city"
            prepend-icon="mdi-home-city"
            placeholder="City"
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            v-model="contact.county"
            placeholder="County"
          ></v-text-field>
        </v-flex>
        <v-flex xs3>
          <v-text-field
            v-model="contact.postal"
            placeholder="Postal code"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="contact.email"
            prepend-icon="mdi-mail"
            placeholder="Email"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            type="tel"
            v-model="contact.phone"
            prepend-icon="mdi-phone"
            placeholder="(000) 000 - 0000"
            mask="phone"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            v-model="contact.notes"
            prepend-icon="mdi-calendar-text"
            placeholder="Notes"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="close">Cancel</v-btn>
      <v-btn color="primary" @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  model: {
    prop: "data",
    event: "change"
  },
  props: {
    data: Object
  },
  data: () => ({}),
  computed: {
    contact() {
      return Object.assign({}, this.data);
    },
    formTitle() {
      return this.data.firstname
        ? `${this.data.firstname} ${this.data.lastname}`
        : "Create contact";
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("change", this.contact);
      this.close();
    }
  }
};
</script>
