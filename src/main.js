// import './assets/main.css'
import "./index.css";

import { createApp } from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(PiniaVuePlugin);
app.use(createPinia());
app.use(ToastPlugin);
app.use(router);

app.mount("#app");
