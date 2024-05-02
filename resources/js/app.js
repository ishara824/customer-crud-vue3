import './bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import { createApp } from "vue";
import { createPinia } from "pinia";
import Router from "./router/index.js";
import App from "./components/App.vue";
import { useAuthStore } from "./store/authStore.js";
import { useRouter} from "vue-router";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(Router);

app.mount('#app');
