import { createApp } from 'vue'
import Toast from "vue-toastification";
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.vue'

const app = createApp(App); 
app.use(Toast);
app.mount('#app'); 