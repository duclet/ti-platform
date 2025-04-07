import { definePreset } from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';
import App from '@src/preview/App.vue';
import MultiProgressIndicator from '@src/preview/MultiProgressIndicator.vue';
import MultiSelectExtended from '@src/preview/MultiSelectExtended.vue';
import TimelineStepper from '@src/preview/TimelineStepper.vue';
import Welcome from '@src/preview/Welcome.vue';
import WizardStepper from '@src/preview/WizardStepper.vue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const app = createApp(App);

const MyPreset = definePreset(Lara, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}',
        },
    },
}) as unknown;

app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            darkModeSelector: '.light-mode-only',
            cssLayer: {
                name: 'primevue',
                order: 'theme, base, primevue',
            },
        },
    },
});
app.use(ConfirmationService);

const routes = [
    { path: '/', component: Welcome },
    { path: '/multi-progress-indicator', component: MultiProgressIndicator },
    { path: '/multi-select-extended', component: MultiSelectExtended },
    { path: '/timeline-stepper', component: TimelineStepper },
    { path: '/wizard-stepper', component: WizardStepper },
];

app.use(createRouter({ routes, history: createWebHistory() }));

app.mount('#app');
