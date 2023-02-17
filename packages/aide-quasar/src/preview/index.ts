import { Dialog, Quasar } from 'quasar';
import { createApp } from 'vue';

import App from './App.vue';

const app = createApp(App);

app.use(Quasar, {
    plugins: { Dialog }, // import Quasar plugins and add here
    /*
    config: {
      brand: {
        // primary: '#e46262',
        // ... or all other brand colors
      },
      notify: {...}, // default set of options for Notify Quasar plugin
      loading: {...}, // default set of options for Loading Quasar plugin
      loadingBar: { ... }, // settings for LoadingBar Quasar plugin
      // ..and many more (check Installation card on each Quasar component/directive/plugin)
    }
    */
});

app.mount('#app');
