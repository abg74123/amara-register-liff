import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import PrimeVue from 'primevue/config';

import Button from "primevue/button"
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Calendar from 'primevue/calendar';
import RadioButton from 'primevue/radiobutton';
import Checkbox from 'primevue/checkbox';

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
// eslint-disable-next-line vue/multi-word-component-names
app.component('Calendar', Calendar);
// eslint-disable-next-line vue/multi-word-component-names
app.component('RadioButton', RadioButton);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Checkbox', Checkbox);

app.mount('#app')
