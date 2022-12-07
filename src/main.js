import { createApp } from "vue";
import App from "./App.vue";

/** Router */
import router from "./router";

/** PrimeVue */
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
// startna import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
// okey dark mode import 'primevue/resources/themes/bootstrap4-dark-blue/theme.css';
// okey light import 'primevue/resources/themes/tailwind-light/theme.css';
// okey ako se doda pozadina import 'primevue/resources/themes/fluent-light/theme.css';
// saga slatka import 'primevue/resources/themes/saga-blue/theme.css';

// ove dvije varijantisati izmedu dark i light
// saga orange beton import 'primevue/resources/themes/saga-orange/theme.css';
// 
//jako dobra dark tema 
import 'primevue/resources/themes/vela-orange/theme.css';

// ne znam malo bland
//import 'primevue/resources/themes/rhea/theme.css';

import 'primeicons/primeicons.css';
import './assets/app.css';

/** PrimeVue Components */
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import TabMenu from 'primevue/tabmenu';
import ProgressSpinner from 'primevue/progressspinner';
import Divider from 'primevue/divider';
import RadioButton from 'primevue/radiobutton';
/** PrimeFlex */
import '/node_modules/primeflex/primeflex.css';

/** Ethers.js */
import { ethers } from 'ethers';

const app = createApp(App);

app.use(router);
app.use(ethers);
app.use(PrimeVue);
app.use(ToastService);

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Toast', Toast);
app.component('Card', Card);
app.component('Panel', Panel);
app.component('TabMenu', TabMenu);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Divider', Divider);
app.component('RadioButton', RadioButton);

app.mount("#app");

//createApp(App).use(router).mount("#app");