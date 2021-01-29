<template>
    <v-container fuild>
        <v-row dense>
            <v-col
                cols="12"
                :md="computeColunas"
                v-for="l in linhas"
                :key="l.id"
            >
                <v-card dark class="mb-3">
                    <v-card-title
                        class="subtitle-1 text-uppercase justify-center"
                        dense
                    >
                        {{ nomeLinha(l) }}
                    </v-card-title>
                    <!-- <v-divider /> -->
                    <v-simple-table dense dark>
                        <template v-slot:default>
                            <tbody>
                                <v-overlay
                                    absolute
                                    opacity="0.8"
                                    :value="!l.isAtiva"
                                    color="red"
                                >
                                    <span
                                        ><v-icon x-large
                                            >mdi-alert-outline</v-icon
                                        ></span
                                    >
                                </v-overlay>
                                <tr v-if="!l.impEmbSetup">
                                    <td class="text-left text-uppercase">
                                        produto
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.produto }}
                                    </td>
                                </tr>
                                <tr v-if="!l.impEmbSetup">
                                    <td class="text-left text-uppercase">
                                        <span
                                            ><v-icon dense
                                                >mdi-package-variant-closed</v-icon
                                            >
                                            aprovadas
                                        </span>
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.embalagensAprovadas }}
                                    </td>
                                </tr>
                                <tr v-if="!l.impEmbSetup">
                                    <td class="text-left text-uppercase">
                                        <span
                                            ><v-icon dense
                                                >mdi-package-variant-closed</v-icon
                                            >
                                            rejeitadas
                                        </span>
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.embalagensRejeitadas }}
                                    </td>
                                </tr>
                                <!-- status impressora embalagem -->
                                <tr
                                    v-if="
                                        l.impEmbComErro ||
                                            !l.impEmbSrvAtivo ||
                                            l.impEmbSetup
                                    "
                                >
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-printer
                                            </v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>
                                                mdi-package-variant-closed
                                            </v-icon>
                                        </span>
                                        status
                                    </td>
                                    <td class="text-right text-uppercase">
                                        <v-icon v-if="l.impEmbSetup"
                                            >mdi-cog-sync-outline</v-icon
                                        >
                                        <v-icon v-else color="red"
                                            >mdi-alert-outline</v-icon
                                        >
                                    </td>
                                </tr>
                                <tr v-else>
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-printer
                                            </v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>
                                                mdi-package-variant-closed
                                            </v-icon>
                                        </span>
                                        conectada
                                    </td>
                                    <td class="text-right text-uppercase">
                                        <v-row>
                                            <v-spacer />
                                            <v-switch
                                                dense
                                                flat
                                                :color="
                                                    l.impEmbProcConDescon
                                                        ? 'black'
                                                        : 'green'
                                                "
                                                :readonly="
                                                    l.impEmbProcConDescon
                                                "
                                                :loading="l.impEmbProcConDescon"
                                                v-model="l.impEmbConectada"
                                                @change="
                                                    switchConnImpEmb(l, $event)
                                                "
                                            ></v-switch>
                                        </v-row>
                                    </td>
                                </tr>
                                <tr
                                    v-if="
                                        l.impEmbImprimindo != null &&
                                            !l.impEmbSetup
                                    "
                                >
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-printer
                                            </v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>
                                                mdi-package-variant-closed
                                            </v-icon>
                                        </span>
                                        imprimindo
                                    </td>
                                    <td class="text-right text-uppercase">
                                        <v-row>
                                            <v-spacer />
                                            <v-switch
                                                dense
                                                flat
                                                :color="
                                                    l.impEmbProcStartStop
                                                        ? 'black'
                                                        : 'green'
                                                "
                                                :readonly="
                                                    l.impEmbProcStartStop
                                                "
                                                :loading="l.impEmbProcStartStop"
                                                v-model="l.impEmbImprimindo"
                                                @change="
                                                    switchPrintImpEmb(l, $event)
                                                "
                                            ></v-switch>
                                        </v-row>
                                    </td>
                                </tr>
                                <tr
                                    v-if="
                                        l.statusTintaImpressoraEmbalagem != null
                                    "
                                >
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-printer
                                            </v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>
                                                mdi-package-variant-closed
                                            </v-icon>
                                        </span>
                                        tinta
                                    </td>
                                    <td :class="getCorStatusTintaImpEmb(l)">
                                        {{ l.statusTintaImpressoraEmbalagem }}%
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        <span
                                            ><v-icon dense>mdi-egg</v-icon>
                                            aprovados
                                        </span>
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.ovosAprovados }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        <span
                                            ><v-icon dense>mdi-egg</v-icon>
                                            rejeitados
                                        </span>
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.ovosRejeitados }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        <span
                                            ><v-icon dense>mdi-egg</v-icon>
                                            suspeitos
                                        </span>
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.ovosSuspeitos }}
                                    </td>
                                </tr>
                                <!-- status impressora ovo -->
                                <tr v-if="l.impOvoComErro || !l.impOvoSrvAtivo">
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-printer
                                            </v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>mdi-egg</v-icon>
                                        </span>
                                        status
                                    </td>
                                    <td class="text-right text-uppercase">
                                        <v-icon color="red"
                                            >mdi-alert-outline</v-icon
                                        >
                                    </td>
                                </tr>
                                <tr v-else>
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-printer
                                            </v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>mdi-egg</v-icon>
                                        </span>
                                        conectada
                                    </td>
                                    <td class="text-right text-uppercase">
                                        <v-row>
                                            <v-spacer />
                                            <v-switch
                                                dense
                                                flat
                                                :color="
                                                    l.impOvoProcConDescon
                                                        ? 'black'
                                                        : 'green'
                                                "
                                                :readonly="
                                                    l.impOvoProcConDescon
                                                "
                                                :loading="l.impOvoProcConDescon"
                                                v-model="l.impOvoConectada"
                                                @change="
                                                    switchConnImpEmb(l, $event)
                                                "
                                            ></v-switch>
                                        </v-row>
                                    </td>
                                </tr>
                                <tr v-if="l.impOvoImprimindo != null">
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>mdi-egg</v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>
                                                mdi-package-variant-closed
                                            </v-icon>
                                        </span>
                                        imprimindo
                                    </td>
                                    <td class="text-right text-uppercase">
                                        <v-row>
                                            <v-spacer />
                                            <v-switch
                                                dense
                                                flat
                                                :color="
                                                    l.impOvoProcStartStop
                                                        ? 'black'
                                                        : 'green'
                                                "
                                                :readonly="
                                                    l.impOvoProcStartStop
                                                "
                                                :loading="l.impOvoProcStartStop"
                                                v-model="l.impOvoImprimindo"
                                                @change="
                                                    switchPrintImpEmb(l, $event)
                                                "
                                            ></v-switch>
                                        </v-row>
                                    </td>
                                </tr>
                                <!--
                                <tr>
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-printer
                                            </v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>mdi-egg </v-icon>
                                        </span>
                                        conectada
                                    </td>
                                    <td class="text-right text-uppercase">
                                        <v-row>
                                            <v-spacer />
                                            <v-switch
                                                dense
                                                v-model="switch2"
                                            ></v-switch>
                                        </v-row>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-printer
                                            </v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>mdi-egg </v-icon>
                                        </span>
                                        imprimindo
                                    </td>
                                    <td class="text-right text-uppercase">
                                        <v-row>
                                            <v-spacer />
                                            <v-switch
                                                dense
                                                dark
                                                v-model="imp"
                                                color="green"
                                                @change="
                                                    switchImpressaoOvo($event)
                                                "
                                            />
                                        </v-row>
                                    </td>
                                </tr>
                                -->
                                <tr v-if="l.impOvoImprimindo != null">
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>mdi-printer</v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>mdi-egg</v-icon>
                                        </span>
                                        tinta
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.statusTintaImpressoraOvo }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-camera-outline
                                            </v-icon>
                                        </span>
                                        <span
                                            ><v-icon dense>mdi-egg</v-icon>
                                        </span>
                                        status
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.statusCameraOvo }}
                                    </td>
                                </tr>
                                <tr class="grey darken-3">
                                    <td class="text-left text-uppercase">
                                        <span>
                                            <v-icon dense>
                                                mdi-camera-outline
                                            </v-icon>
                                        </span>
                                        <span>
                                            <v-icon dense>
                                                mdi-package-variant-closed
                                            </v-icon>
                                        </span>
                                        status
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.statusCameraEmbalagem }}
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="telaGrande">
            <v-col cols="2" class="mb-n5">
                <v-combobox
                    v-model="colunas"
                    :items="[1, 2, 3, 4]"
                    label="Colunas por linha"
                    outlined
                    dense
                    open-on-clear
                ></v-combobox>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import { statusImpressoraEmbalagem } from '../../store/constantesSistema';

export default {
    data() {
        return {
            colunas: 3,
            imp: true,
            switch2: true,
            statusImpressoraEmbalagem: statusImpressoraEmbalagem
        };
    },

    computed: mapState({
        nomeContador: 'nomeContador',
        getStatusContador() {
            return this.$store.state.statusContador ? 'ativo' : 'inativo';
        },
        getCorLinhaStatusContador() {
            return this.$store.state.statusContador ? 'dark' : 'red darken-4';
        },
        linhas() {
            var l = this.$store.getters.getLinhasFabrica[0];
            if (l.info) {
                return l.info.linhas;
            }
            this.$store.dispatch('menuFabricas');
        },
        computeColunas() {
            if (!this.colunas) {
                return 3;
            }
            return 12 / this.colunas;
        },
        telaGrande() {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs':
                    return false;
                case 'sm':
                    return false;
                case 'md':
                    return true;
                case 'lg':
                    return true;
                case 'xl':
                    return true;
            }
        }
    }),

    methods: {
        getInicioProducao(linha) {
            if (!linha.inicioProducao) {
                return null;
            }
            return linha.inicioProducao.split(' ')[1];
        },

        enviarMensagem() {
            //console.log('okkkkkkkkkk');
            return this.$store.dispatch('enviarMensagem');
        },

        nomeLinha(l) {
            return l.id + ' - ' + l.ip;
        },

        enviarPause(linha) {
            return this.$store.dispatch('pauseImpressoraEmbalagem', {
                linha: linha
            });
        },

        traduzirStatusImpressoraEmbalagem(status) {
            switch (status) {
                case 0:
                    return 'erro';
                case 1:
                    return 'parada';
                case 2:
                    return 'imprimindo';
                case 3:
                    return 'imprimindo';
                case 4:
                    return 'imprimindo';
                case 5:
                    return 'imprimindo';
                default:
                    return '???';
            }
        },

        getCorStatusTintaImpEmb(linha) {
            if (linha.statusTintaImpressoraEmbalagem > 70) {
                return 'text-right green--text';
            }
            if (linha.statusTintaImpressoraEmbalagem > 50) {
                return 'text-right yellow--text';
            }
            return 'text-right red--text';
        },

        switchImpressaoOvo(evt) {
            alert('okkkkk ' + evt);
        },

        switchConnImpEmb(linha, evt) {
            if (evt) {
                return this.$store.dispatch('conectarImpEmb', {
                    linha: linha
                });
            } else {
                return this.$store.dispatch('desconectarImpEmb', {
                    linha: linha
                });
            }
        },

        switchPrintImpEmb(linha, evt) {
            console.log('switchPrintImpEmb: ' + evt);
            if (evt) {
                return this.$store.dispatch('startPrintImpEmb', {
                    linha: linha
                });
            } else {
                return this.$store.dispatch('stopPrintImpEmb', {
                    linha: linha
                });
            }
        }
    }
};
</script>

<style scoped></style>
