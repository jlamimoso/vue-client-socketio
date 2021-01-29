<template>
    <div id="cabecalho">
        <v-system-bar dark color="primary" windows app>
            <!-- red warning primary -->
            <span class="pt-1">
                <img src="@/assets/teste.png" />
            </span>
            <span class="pl-1 text-uppercase"
                ><strong> monitor fábricas</strong></span
            >
            <v-spacer />
            <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="sair">
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-btn>
                </template>
                <span>Sair</span>
            </v-tooltip>
            <!--
            <span><v-icon medium>mdi-signal-off</v-icon></span>
            <span><v-icon medium>mdi-battery-10</v-icon></span>
            <span><v-icon medium>mdi-bell</v-icon></span>
            <span><v-icon medium>mdi-printer-off</v-icon></span>
            <span><v-icon medium>mdi-server-off</v-icon></span>
            -->
        </v-system-bar>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AppNavigation',

    computed: {
        estaLogado() {
            return true;
        },

        classHeader() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs':
                case 'sm':
                    return 'text-h6 font-weight-regular';
                default:
                    return 'text-h5';
            }
        }
    },

    methods: {
        ...mapActions(['logout']),
        async sair() {
            await this.logout();
        }
    }
};
</script>

<style scoped></style>
