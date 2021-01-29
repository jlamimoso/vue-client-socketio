<template>
    <v-card>
        <v-card-title>
            <v-row class="mt-n4">
                <v-spacer></v-spacer>
                <v-col cols="12" md="3">
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Filtro"
                        single-line
                        hide-details
                        clearable
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table
            dense
            :headers="headers"
            :items="linhas"
            :search="search"
            :footer-props="{
                itemsPerPageText: 'Linhas por pag',
                pageText: '{0}-{1} de {2}',
                itemsPerPageAllText: 'Todos',
                itemsPerPageOptions: [10, 15, 25, 30, -1]
            }"
            :item-class="row_classes"
            no-data-text="Não há dados para exibir"
            single-expand
            :expanded.sync="expanded"
            show-expand
            item-key="data"
        >
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-container class="grey darken-3">
                        <v-row>
                            <v-col cols="12" sm="6">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                            <tr class="text-uppercase">
                                                <td>data fabricação</td>
                                                <td class="text-right">
                                                    {{ item.dataFabricacao }}
                                                </td>
                                            </tr>
                                            <tr class="text-uppercase">
                                                <td>data validade</td>
                                                <td class="text-right">
                                                    {{ item.dataValidade }}
                                                </td>
                                            </tr>
                                            <tr class="text-uppercase">
                                                <td>total impressão</td>
                                                <td class="text-right">
                                                    {{ item.totalImpressos }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-simple-table>
                                    <template v-slot:default>
                                        <tbody>
                                            <tr class="text-uppercase">
                                                <td>embalagens aprovadas</td>
                                                <td class="text-right">
                                                    {{ item.embAprovadas }}
                                                </td>
                                            </tr>
                                            <tr class="text-uppercase">
                                                <td>embalagens rejeitadas</td>
                                                <td class="text-right">
                                                    {{ item.embRejeitadas }}
                                                </td>
                                            </tr>
                                            <tr class="text-uppercase">
                                                <td>ovos aprovados</td>
                                                <td class="text-right">
                                                    {{ item.ovosAprovados }}
                                                </td>
                                            </tr>
                                            <tr class="text-uppercase">
                                                <td>ovos rejeitados</td>
                                                <td class="text-right">
                                                    {{ item.ovosRejeitados }}
                                                </td>
                                            </tr>
                                            <tr class="text-uppercase">
                                                <td>ovos suspeitos</td>
                                                <td class="text-right">
                                                    {{ item.ovosSuspeitos }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </td>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            expanded: [],
            headers: [
                {
                    text: 'data',
                    value: 'data',
                    align: 'center',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                },
                {
                    text: 'linha',
                    value: 'linha',
                    align: 'left',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                },
                {
                    text: 'operador',
                    value: 'operador',
                    align: 'left',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                },
                {
                    text: 'produto',
                    value: 'produto',
                    align: 'left',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                },
                {
                    text: 'lote',
                    value: 'lote',
                    align: 'left',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                },
                { text: '', value: 'data-table-expand' }
                /*
                { text: 'EVENTO', value: 'tipo' },
                {
                    text: 'MENSAGEM',
                    value: 'mensagem',
                    sortable: false,
                    filterable: false
                }
                */
            ],
            linhas: [
                {
                    data: '18/09/2020 10:00:11 - 19:10:01',
                    linha: 'linha01',
                    produto: 'Ovo branco',
                    dataFabricacao: '17/SET/2020',
                    lote: 'lote12345',
                    dataValidade: '15/OUT/2020',
                    totalImpressos: '12327',
                    embAprovadas: '12300',
                    embRejeitadas: '27',
                    ovosAprovados: '12301',
                    ovosRejeitados: '20',
                    ovosSuspeitos: '6',
                    operador: 'oper01'
                },
                {
                    data: '18/09/2020 09:10:21 - 15:12:31',
                    linha: 'linha02',
                    produto: 'Ovo Caipira',
                    operador: 'oper01',
                    dataFabricacao: '17/SET/2020',
                    lote: 'lote54321',
                    dataValidade: '15/OUT/2020',
                    totalImpressos: '12327',
                    embAprovadas: '12300',
                    embRejeitadas: '27',
                    ovosAprovados: '12301',
                    ovosRejeitados: '20',
                    ovosSuspeitos: '6'
                }
            ]
        };
    },
    computed: {
        /*
        linhas() {
            return this.$store.state.log;
        }
        */
    },
    methods: {
        row_classes(item) {
            /*
            if (item.evento == 'SETUP') {
                return 'orange text-uppercase';
            }
            */
            if (item.evento == 'LINHA_INATIVA') {
                return 'red text-uppercase';
            }
            return 'text-uppercase';
        }
    }
};
</script>

<style scoped></style>
