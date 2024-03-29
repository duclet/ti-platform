import App from '@src/preview/App.vue';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';

const app = createApp(App);

app.use(PrimeVue);
app.mount('#app');
