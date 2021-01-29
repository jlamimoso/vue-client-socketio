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
        ></v-data-table>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            search: '',
            headers: [
                {
                    text: 'DATA',
                    value: 'dataHora',
                    align: 'center',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                },
                {
                    text: 'fábrica',
                    value: 'fabrica',
                    align: 'left',
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
                    text: 'OPERADOR',
                    value: 'operador',
                    align: 'left',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                },
                {
                    text: 'TIPO',
                    value: 'tipo',
                    align: 'left',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                },
                {
                    text: 'COMPONENTE',
                    value: 'componente',
                    align: 'left',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                },
                {
                    text: 'EVENTO',
                    value: 'evento',
                    align: 'left',
                    class:
                        'text-subtitle-1 text-center font-weight-bold text-uppercase'
                }
                /*
                { text: 'EVENTO', value: 'tipo' },
                {
                    text: 'MENSAGEM',
                    value: 'mensagem',
                    sortable: false,
                    filterable: false
                }
                */
            ]
        };
    },
    computed: {
        linhas() {
            return this.$store.state.log;
        }
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
