import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Statistic from './components/Statistic.vue'

export const router = createRouter({
    routes: [{
        path: '/', component: Home,
    }, {
        path: '/statistic', component: Statistic,
    }],
    history: createWebHistory()
})
