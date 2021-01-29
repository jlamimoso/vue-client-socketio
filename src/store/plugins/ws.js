var WS = {
    socket: null,
    enviouMsgErro: false,
    ID: 1,
    MSG_SISTEMA_INDISPONIVEL: '9999 - sistema inativo',

    init: function(store, url, portaWS) {
        /*
        store.subscribe(mutation => {
            console.log('subscribe: ' + mutation.type);
            console.log('subscribe: ' + mutation.payload);
            if (mutation.type === 'alterarComando') {
                WS.socket.send('saco cheio dessa merda');
            } else {
                if (mutation.type === 'setMensagemBroker') {
                    WS.socket.send(mutation.payload);
                }
            }
        });
        */
        WS.socket = new WebSocket(
            'ws://' + url + ':' + portaWS + '/monitor/servicos'
        );

        WS.socket.addEventListener('open', function() {
            //console.log('open 11111');
            //console.log('store: ' + store);
            if (WS.enviouMsgErro) {
                //store.dispatch('excluirMensagem', WS.id);
                store.commit('alterarMensagensSistema', []);
            }
            WS.enviouMsgErro = false;
            store.commit('alterarStatusSistema', { status: true });
        });

        WS.socket.addEventListener('close', function() {
            //console.log('close 22222');
            store.commit('alterarStatusSistema', { status: false });
            if (!WS.enviouMsgErro) {
                /*
                store.commit(
                    'alterarMensagensSistema',
                    'sistema de monitoramento inativo'
                );
                
                store.dispatch('incluirMensagemErro', {
                    id: WS.id,
                    mensagem: 'sistema de monitoramento inativo'
                });
                */

                store.commit('alterarMensagensSistema', [
                    {
                        id: WS.ID,
                        mensagem: WS.MSG_SISTEMA_INDISPONIVEL,
                        type: 'error',
                        dismissible: false
                    }
                ]);

                WS.enviouMsgErro = true;
            }

            setTimeout(function() {
                WS.init(store, url, portaWS);
                //console.log('close 11111');
            }, 2000);
        });

        WS.socket.addEventListener('message', function(message) {
            if (message.data == 'null') {
                return;
            }
            console.log(message);
            //var new_obj = {
            //    id: '--',
            //    nome: '--',
            //    servicoAtivo: ''
            //};
            var json = JSON.parse(message.data);
            Object.entries(json).forEach(([key, value]) => {
                switch (key) {
                    case 'statusLinha':
                        var l = value
                            .filter(p => p.isAtiva)
                            .concat(value.filter(p => !p.isAtiva));
                        store.commit('alterarStatusLinhas', l);
                        //new_obj.id = value;
                        break;
                    case 'mensagensSistema':
                        //var m = JSON.parse(value);
                        var msgs = [];
                        value.forEach(function(m, i) {
                            msgs.push({
                                id: i,
                                mensagem: m,
                                type: 'error',
                                dismissible: false
                            });
                        });
                        store.commit('alterarMensagensSistema', msgs);
                        //new_obj.nome = value;
                        break;
                    case 'log':
                        store.commit('alterarLogSistema', value);
                        break;
                    case 'produtos':
                        store.commit('alterarProdutos', value);
                        break;
                    default:
                        console.log('key invalida: ' + key);
                        break;
                }
            });
            //console.log(
            //    new_obj.id + ': ' + new_obj.nome + ' ' + new_obj.servicoAtivo
            //);
            //store.dispatch('incluirStatusLinha', new_obj);
        });
    }
};

export default function getWS() {
    return store => {
        WS.init(store, '127.0.0.1', 9000); //192.168.0.136

        store.subscribe(mutation => {
            //console.log('subscribe 11: ' + mutation.type);
            //console.log('subscribe 11: ' + mutation.payload);
            if (mutation.type === 'alterarComando') {
                WS.socket.send('saco cheio dessa merda');
            } else {
                if (mutation.type === 'setMensagemBroker') {
                    WS.socket.send(mutation.payload);
                }
            }
        });
    };
}
