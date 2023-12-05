import {createApp} from 'vue';
import {createPinia} from 'pinia';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import {aliases, mdi} from 'vuetify/iconsets/mdi';
import {createVuetify} from 'vuetify';

import '@/assets/App.scss';
import '@fontsource/permanent-marker';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(
  createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  })
);

app.mount('#app');
