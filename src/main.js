import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { VuesticPlugin } from "vuestic-ui";
import App from "./App.vue";

import router from "./router"; 
import 'bootstrap/dist/css/bootstrap.css';


const app = createApp(App);
app.use(router);
app.use(VuesticPlugin);
app.use(VueAxios, axios);

app.mount("#app");
