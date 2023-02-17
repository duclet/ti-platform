<template>
    <div class="root">
        <QCard>
            <QCardSection>
                <q-select v-model="selectedComponent" :options="components" label="Component" clearable />
            </QCardSection>
            <QSeparator size="md" />
            <QCardSection v-if="selectedComponent">
                <!-- Having issues with Typescript when trying to use <component /> -->
                <MultiProgressIndicator v-if="selectedComponent === 'MultiProgressIndicator'" />
                <TimelineStepper v-if="selectedComponent === 'TimelineStepper'" />
                <WizardStepper v-if="selectedComponent === 'WizardStepper'" />
            </QCardSection>
        </QCard>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import MultiProgressIndicator from './MultiProgressIndicator.vue';
    import TimelineStepper from './TimelineStepper.vue';
    import WizardStepper from './WizardStepper.vue';

    const components: Array<string> = ['MultiProgressIndicator', 'TimelineStepper', 'WizardStepper'];

    const selectedComponent = ref<string>();
</script>

<style lang="scss">
    $primary: #31495e;
    $secondary: #f6c28b;
    $accent: #ff6b35;

    $dark: #171614;

    $positive: #7fb069;
    $negative: #a24936;
    $info: #bdbea9;
    $warning: #f4d35e;

    @import '~@quasar/extras/material-icons/material-icons.css';
    @import '~quasar/src/css/variables.sass';
    @import '~quasar/src/css/index.sass';

    .flash {
        animation: flash 1s;
    }

    @keyframes flash {
        from,
        20%,
        40%,
        60%,
        80%,
        to {
            opacity: 1;
        }

        10%,
        30%,
        50%,
        70%,
        90% {
            opacity: 0;
        }
    }
</style>

<style lang="scss" scoped>
    .root {
        margin: 20px;
    }
</style>
