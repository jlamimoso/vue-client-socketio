<template>
    <v-app id="app">
        <!--  class="grey darken-3"> -->
        <div>
            <app-navigation></app-navigation>
            <app-mensagens></app-mensagens>
            <!-- <app-body></app-body>             <app-login></app-login>
-->
            <router-view />
            <!-- <app-footer></app-footer> -->
        </div>
    </v-app>
</template>

<script>
import AppNavigation from '@/components/AppNavigation';
import AppMensagens from '@/components/AppMensagens';
//import AppLogin from '@/components/AppLogin';
//import AppBody from '@/components/AppBody';

export default {
    name: 'app',
    components: {
        AppNavigation,
        AppMensagens
        //AppLogin
        //AppBody
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    /*color: #2c3e50; */
    color: rgb(29, 28, 28);
    background-color: rgb(51, 48, 48);
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    /* color: #42b983; */
    color: #000000;
}
</style>
