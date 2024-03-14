import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { createApp } from "vue";
import Router from "./router/index.js";
import App from "./components/App.vue";

const app = createApp(App);

app.use(Router);
app.mount('#app');
