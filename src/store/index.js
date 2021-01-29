import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router/index';
//import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: 'adm',
        userAutenticado: false,
        id: 'lelena54321',
        sistemaAtivo: false,
        fabricas: [],
        log: [],
        fabricaCorrente: null,
        mensagem: null,
        mensagens: []
    },

    mutations: {
        setUser(state, username) {
            state.user = username;
        },

        setMensagem(state, mensagem) {
            state.mensagem = mensagem;
        },

        login(state, username) {
            state.user = username;
            state.mensagem = null;
        },

        logout(state) {
            state.user = null;
            state.userAutenticado = false;
            state.mensagem = null;
        },

        SOCKET_CONNECT(state) {
            console.log('conectou!!!!!!');
            state.userAutenticado = true;
            state.sistemaAtivo = true;
            state.mensagem = null;
        },

        SOCKET_CONNECT_ERROR(state, err) {
            console.log('erro conectando ' + err);
            var m = err.toString().substring(7);
            var pref = m.substring(0, 2);
            if (pref != '99') {
                state.mensagem = '9999 - erro acesso sistema (' + m + ')';
            } else {
                state.mensagem = m;
            }
            if (!state.userAutenticado) {
                this._vm.$socket.client.disconnect();
            }
        },

        SOCKET_DISCONNECT(state) {
            console.log('desconectou!!!!');
            state.sistemaAtivo = false;
            if (state.user) {
                state.mensagens = [
                    {
                        id: 1,
                        mensagem: '9999 - sistema indisponível',
                        type: 'error',
                        dismissible: false
                    }
                ];
            }
        },

        SOCKET_FABRICAS(state, payload) {
            //console.log('recebiiiiiiiiii ' + payload);
            state.fabricas = JSON.parse(payload);
            //console.log('fabricas: ' + state.fabricas['linha1']);
            /*
            Object.entries(payload).forEach(([k, v]) => {
                console.log('k: ' + k + ' v: ' + v);
            });
            */
            //state.mensagens = payload;
        },

        alterarMensagensSistema(state, payload) {
            state.mensagens = payload;
        },

        alterarLogSistema(state, payload) {
            state.log = payload;
        },

        alterarFabricaCorrente(state, payload) {
            state.fabricaCorrente = payload;
            console.log('commit: ' + state.fabricaCorrente);
        }
    },

    actions: {
        async LogIn({ commit }, form) {
            commit('login', form.username);
            //commit('setMensagem', null);
            //{"username":"admin","password":"admin"}
            try {
                /*
                var resp = await axios.post('login', json);
                if (resp.data.erro) {
                    var m = '9998 - Usuário ou senha inválido';
                    commit('setMensagem', m);
                    return;
                }
                commit('setUser', form.username);
                */
                console.log('logIn....6 ' + this._vm.$socket.client.auth.token); //Object.entries(this._vm.$socket.client));
                this._vm.$socket.client.auth.user = form.username;
                this._vm.$socket.client.auth.passw = form.password;
                this._vm.$socket.client.open();
            } catch (error) {
                console.log('logIn: ' + error);
                commit('setMensagem', error.toString().substring(6));
            }
        },

        async logout({ commit }) {
            console.log('logout...');
            this._vm.$socket.client.disconnect();
            commit('logout');
        },

        getLogSistema({ commit }) {
            console.log('getLogSistema.... ' + commit);
            //this._vm.$socket.client.disconnect();
            this._vm.$socket.client.emit('logRequest', '', resp => {
                //console.log('log response: ' + resp);
                commit('alterarLogSistema', JSON.parse(resp));
            });
        },

        consultarFabrica({ commit }, fabrica) {
            console.log('consultarFabrica: ' + fabrica);
            commit('alterarFabricaCorrente', fabrica);
            router.replace('fabrica');
        },

        menuFabricas({ commit }, fabrica) {
            console.log('menuFabricas: ' + fabrica);
            commit('alterarFabricaCorrente', null);
            router.replace('/');
        }
    },

    modules: {},

    getters: {
        getLinhasFabrica: state => {
            return state.fabricas.filter(p => p.id == state.fabricaCorrente);
        },

        getUser: state => {
            console.log('------->>>>>>>>> getUser: ' + state.user);
            return state.user;
        }
    }
});
