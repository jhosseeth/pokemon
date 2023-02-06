import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'


const app = createApp(App)

app.use(router)

app.mount('#app')
