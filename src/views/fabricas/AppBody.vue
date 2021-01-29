<template>
    <div id="body">
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-scroll="onScroll"
                    v-show="fab"
                    fab
                    dark
                    fixed
                    bottom
                    right
                    color="primary"
                    @click="toTop"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
            </template>
            <span>Início</span>
        </v-tooltip>

        <v-expansion-panels dark multiple :disabled="!mdwAtivo" :value="painel">
            <v-expansion-panel class="grey darken-3">
                <v-expansion-panel-header class="subtitle-1 text-uppercase">
                    Fábricas
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <app-body-status-fabricas />
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel
                class="grey darken-3"
                @click="clickPainelLogProducao"
            >
                <v-expansion-panel-header class="subtitle-1 text-uppercase">
                    Produção Fábricas
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-left">
                    <app-body-log-producao />
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel
                class="grey darken-3"
                @click="clickPainelLogSistema"
            >
                <v-expansion-panel-header class="subtitle-1 text-uppercase">
                    log do sistema
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-left">
                    <app-body-log-sistema />
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>

        <app-login v-if="!this.$store.state.userAutenticado" />
    </div>
</template>

<script>
import AppBodyStatusFabricas from '../../components/fabricas/AppBodyStatusFabricas';
import AppBodyLogSistema from '../../components/fabricas/AppBodyLogSistema';
import AppBodyLogProducao from '../../components/fabricas/AppBodyLogProducao';
import AppLogin from '../../components/AppLogin';

export default {
    components: {
        AppBodyStatusFabricas,
        AppBodyLogSistema,
        AppBodyLogProducao,
        AppLogin
    },

    data() {
        return {
            fab: false,
            painelLogSistema: false,
            painelLogProducao: false
        };
    },
    watch: {
        mdwAtivo: function(val) {
            if (!val) {
                this.painelLogSistema = false;
            }
        }
    },
    computed: {
        mdwAtivo() {
            return this.$store.state.sistemaAtivo;
        },
        painel() {
            if (this.$store.state.sistemaAtivo) {
                return;
            }
            return [];
        }
    },

    methods: {
        onScroll(e) {
            if (typeof window === 'undefined') {
                return;
            }
            const top = window.pageYOffset || e.target.scrollTop || 0;
            this.fab = top > 10;
        },
        toTop() {
            this.scrollInvoked = 0;
            this.$vuetify.goTo(0);
        },
        clickPainelLogSistema() {
            if (!this.painelLogSistema) {
                this.$store.dispatch('getLogSistema');
            }
            this.painelLogSistema = !this.painelLogSistema;
        },
        clickPainelLogProducao() {
            if (!this.painelLogProducao) {
                this.$store.dispatch('getLogSistema');
            }
            this.painelLogProducao = !this.painelLogProducao;
        }
    }
};
</script>

<style scoped></style>
