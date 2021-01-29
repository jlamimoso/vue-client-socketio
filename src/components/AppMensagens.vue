<template>
    <div id="mensagens" class="mt-7">
        <v-alert
            :value="
                !!this.$store.state.mensagem &&
                    this.$store.state.userAutenticado
            "
            class="my-1 text-left text-uppercase"
            type="error"
        >
            {{ this.$store.state.mensagem }}
        </v-alert>
    </div>
</template>

<script>
export default {
    created: function() {
        this.$socket.client.emit('hi', 'caralhoooooooo', resp => {
            console.log('encerra por hj: ' + resp);
        });
    },
    computed: {},
    methods: {}
};
</script>

<style scoped></style>
