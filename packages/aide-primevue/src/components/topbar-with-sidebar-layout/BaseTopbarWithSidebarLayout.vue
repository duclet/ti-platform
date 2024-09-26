<script lang="ts">
    import BaseComponent from '@primevue/core/basecomponent';
    import TopbarWithSidebarLayoutStyle from '@src/components/topbar-with-sidebar-layout/style';

    export default {
        name: 'BaseTopbarWithSidebarLayout',
        extends: BaseComponent,
        style: TopbarWithSidebarLayoutStyle,
        provide() {
            return {
                $pcTopBarWithSidebarLayout: this,
                $parentInstance: this,
            };
        },
    };
</script>
