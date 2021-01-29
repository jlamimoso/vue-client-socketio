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

        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    fab
                    color="primary"
                    bottom
                    left
                    fixed
                    @click="$router.replace('/')"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </template>
            <span>Retornar</span>
        </v-tooltip>

        <v-expansion-panels dark multiple :disabled="!mdwAtivo" :value="painel">
            <v-expansion-panel class="grey darken-3">
                <v-expansion-panel-header class="subtitle-1 text-uppercase">
                    Linhas de Produção
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <app-body-status-linha />
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel
                class="grey darken-3"
                @click="clickPainelLogProducao"
            >
                <v-expansion-panel-header class="subtitle-1 text-uppercase">
                    Produção
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
            <!--
            <v-expansion-panel class="grey darken-3">
                <v-expansion-panel-header class="subtitle-1 text-uppercase">
                    configuração do sistema
                </v-expansion-panel-header>
                <v-expansion-panel-content class="text-left">
                    <app-body-estatisticas />
                </v-expansion-panel-content>
            </v-expansion-panel>
            -->
        </v-expansion-panels>
        <!--
        <v-card class="mx-auto mt-1" outlined color="grey darken-4">
            <v-card-title
                class="subtitle-1 text-uppercase justify-center"
                dense
                dark
            >
                Água Mineral Fonte Sei Lá Caralho 500ml
            </v-card-title>
            <v-container class="grey darken-3">
                <v-row v-for="x in 20" :key="x" no-gutters>
                    <v-col v-for="n in 3" :key="n" cols="12" sm="4">
                        <v-card class="pa-2" outlined tile>
                            {{ x }} - One of three columns
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
        -->
        <!--
        <v-footer
            fixed
            class="font-weight-medium"
            color="black"
            dark
            padless="true"
        >
            <v-col class="text-center" cols="12">
                Modo: Online Saldo de Selos: 150.123
            </v-col>
        </v-footer>
        -->
    </div>
</template>

<script>
import AppBodyStatusLinha from '../../components/linhas/AppBodyStatusLinha';
import AppBodyLogSistema from '../../components/linhas/AppBodyLogSistema';
import AppBodyLogProducao from '../../components/linhas/AppBodyLogProducao';
import { mapActions } from 'vuex';

export default {
    components: {
        AppBodyStatusLinha,
        AppBodyLogSistema,
        AppBodyLogProducao
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
        ...mapActions(['menuFabricas']),

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
