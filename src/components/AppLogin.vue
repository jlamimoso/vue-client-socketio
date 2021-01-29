<template>
    <div>
        <v-overlay
            class="my-overlay"
            :value="overlay"
            opacity="0.9"
            color="grey darken-1"
        >
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-container fluid>
                    <v-row justify="center">
                        <v-col cols="10" md="4">
                            <v-alert
                                :value="!!this.$store.state.mensagem"
                                type="error"
                                dense
                            >
                                {{ this.$store.state.mensagem }}
                            </v-alert>
                            <v-text-field
                                append-icon="mdi-account"
                                :value="form.username"
                                v-on:keyup="form.username = $event.target.value"
                                :counter="8"
                                :rules="nameRules"
                                placeholder="Nome do usuário"
                                v-on:keyup.enter="logon"
                                required
                                full-width
                                outlined
                            >
                            </v-text-field>
                            <v-text-field
                                class="mt-2"
                                :append-icon="
                                    showPassw ? 'mdi-eye' : 'mdi-eye-off'
                                "
                                :value="form.password"
                                v-on:keyup="form.password = $event.target.value"
                                :rules="passwordRules"
                                placeholder="Senha"
                                :type="showPassw ? 'text' : 'password'"
                                v-on:keyup.enter="logon"
                                @click:append="showPassw = !showPassw"
                                required
                                outlined
                            >
                            </v-text-field>
                            <v-btn
                                :loading="isProcessando"
                                :disabled="!valid"
                                color="success"
                                @click="logon"
                                block
                                large
                            >
                                Entrar no Sistema
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-overlay>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            overlay: true,
            form: {
                username: '',
                password: ''
            },
            valid: true,
            showPassw: false,
            isProcessando: false,

            nameRules: [
                v => !!v || 'Informe o usuário',
                v =>
                    (v && v.length <= 8) ||
                    'Nome deve ter no máximo 8 caracteres'
            ],

            passwordRules: [
                v => !!v || 'Informe a senha',
                v =>
                    (v && v.length <= 12) ||
                    'Senha deve ter no máximo 12 caracteres'
            ]
        };
    },

    computed: {},

    methods: {
        ...mapActions(['LogIn']),
        async logon() {
            if (!this.$refs.form.validate()) {
                return;
            }
            this.isProcessando = true;
            try {
                await this.LogIn(this.form);
            } catch (error) {
                console.log('erro login: ' + error);
            } finally {
                this.isProcessando = false;
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-overlay >>> .v-overlay__content {
    width: 100%;
    height: 100%;
    margin-top: 8%;
}
</style>
