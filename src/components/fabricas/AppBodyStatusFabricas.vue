<template>
    <v-container fuild>
        <v-row dense>
            <v-col
                cols="12"
                :md="computeColunas"
                v-for="l in fabricas"
                :key="l.id"
            >
                <v-card dark class="mb-3">
                    <v-card-title
                        class="subtitle-1 text-uppercase justify-center"
                        dense
                    >
                        {{ l.nome }}
                    </v-card-title>
                    <!-- <v-divider /> -->
                    <v-simple-table dense dark>
                        <template v-slot:default>
                            <tbody v-if="l.info">
                                <tr>
                                    <td class="text-left text-uppercase">
                                        conexão
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{
                                            l.info
                                                .dataHoraInicioConexaoBrokerCentral
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        início
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.info.dataHoraInicioMDW }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        total linhas
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ l.info.linhas.length }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        linhas ativas
                                    </td>
                                    <td class="text-right text-uppercase">
                                        {{ getLinhasAtivas(l.info.linhas) }}
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <v-overlay absolute opacity="0.8" color="red">
                                    <span
                                        ><v-icon x-large
                                            >mdi-alert-outline</v-icon
                                        ></span
                                    >
                                </v-overlay>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        conexão
                                    </td>
                                    <td />
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        início
                                    </td>
                                    <td />
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        total linhas
                                    </td>
                                    <td />
                                </tr>
                                <tr>
                                    <td class="text-left text-uppercase">
                                        linhas ativas
                                    </td>
                                    <td />
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                    <v-card-actions>
                        <v-btn
                            color="primary"
                            block
                            class="text-center text-uppercase"
                            @click="consultarFabrica(l.id)"
                        >
                            consultar
                        </v-btn>
                    </v-card-actions>
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

export default {
    data() {
        return {
            colunas: 3
        };
    },

    computed: mapState({
        nomeContador: 'nomeContador',
        fabricas: 'fabricas',
        getStatusContador() {
            return this.$store.state.statusContador ? 'ativo' : 'inativo';
        },
        getCorLinhaStatusContador() {
            return this.$store.state.statusContador ? 'dark' : 'red darken-4';
        },
        linhas() {
            return this.$store.state.linhas;
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
        getLinhasAtivas(linha) {
            return linha.filter(p => p.isAtiva).length;
        },

        consultarFabrica(fabrica) {
            console.log('fabrica: ' + fabrica);
            this.$store.dispatch('consultarFabrica', fabrica);
        }
    }
};
</script>

<style scoped></style>
