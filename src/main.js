import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import VueGapi from "vue-gapi";

import CKEditor from "@ckeditor/ckeditor5-vue";
import vue3GoogleLogin from "vue3-google-login";
import Toaster from "@meforma/vue-toaster";
import VueProgressBar from "@aacassandra/vue3-progressbar";

import "v-tooltip/dist/v-tooltip.css";

const app = createApp(App);
const options = {
  show: false,
  color: "#0C00FF",
  failedColor: "#B62B2B",
  thickness: "3px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    // termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

window.ENDPOINT = 'https://webulegal.com/api';
window.PATHUPLOAD = 'https://webulegal.com/uploads/';
window.ENDPOINTEXPORTS = 'https://webulegal.com/exports/';
window.BASEURL = 'https://webulegal.com';

// window.ENDPOINT = "http://localhost:4000/api";
// window.postPATHUPLOAD = "http://localhost:4000/api/upload";
// window.getPATHUPLOAD = "http://localhost:4000/uploads";
// window.ENDPOINTEXPORTS = "http://localhost:4000/exports/";
// window.BASEURL = "http://localhost:4000";


app.use(VueGapi, {
  apiKey: "8df19e66ae3486207a156237c15ede31adef0fa1",
  clientId: "105288870070967819657.apps.googleusercontent.com",
  discoveryDocs: ["https://docs.googleapis.com/$discovery/rest?version=v1"],
  scope: "https://www.googleapis.com/auth/documents.readonly",
});

app.use(Toaster);

app.use(vue3GoogleLogin, {
  clientId:
    "873163088650-rdtnllo0415r64pdgi4gilgnghgr5soc.apps.googleusercontent.com",
  buttonConfig: {
    theme: "outline",
    shape: "circle",
    locale: "es",
  },
});

import { VTooltip } from "v-tooltip";
app.directive("tooltip", VTooltip);
app.use(createPinia());
app.use(VueProgressBar, options);
app.use(router);
app.use(CKEditor);
app.mount("#app");
