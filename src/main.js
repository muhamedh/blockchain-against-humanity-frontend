import { createApp } from "vue";
import App from "./App.vue";

/** Router */
import router from "./router";

/** PrimeVue */
import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css';
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

app.mount("#app");

//createApp(App).use(router).mount("#app");