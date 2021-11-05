import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

let darkMode = sessionStorage.getItem("darkMode");
if (!darkMode) {
  darkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default new Vuetify({
  theme: {
    dark: darkMode,
    themes: {
      light: {
        primary: colors.blue.darken3, //"#1976D2",
        secondary: "#424242",
        accent: colors.pink, //"#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      },
      dark: {
        primary: colors.blue.darken3, //"#2196F3",
        secondary: "#424242",
        accent: colors.pink, //"#FF4081",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FB8C00"
      }
    }
  }
});
