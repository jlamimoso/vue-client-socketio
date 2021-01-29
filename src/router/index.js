import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/fabricas/AppBody.vue';
import Fabrica from '../views/linhas/AppBody.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/fabrica',
        name: 'fabrica',
        component: Fabrica
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
