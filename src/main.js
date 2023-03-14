// Composables
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router';

// Components
import App from './App.vue';

// Plugins
import { registerPlugins } from '@/plugins';

const app = createApp(App);

registerPlugins(app);

app.use(createPinia()).use(router).mount('#app');
