import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import Button from "primevue/button"
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';

import 'primevue/resources/themes/aura-light-green/theme.css'

const app = createApp(App)
app.use(PrimeVue);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Button', Button);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Card', Card);
// eslint-disable-next-line vue/multi-word-component-names
app.component('InputText', InputText);
// eslint-disable-next-line vue/multi-word-component-names
app.component('InputMask', InputMask);

app.mount('#app')
