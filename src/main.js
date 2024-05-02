// import './assets/main.css'
import "./index.css";

import { createApp } from "vue";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.use(PiniaVuePlugin);
app.use(createPinia());
app.use(router);

app.mount("#app");
