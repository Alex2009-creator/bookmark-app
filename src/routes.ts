import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Statistic from './components/Statistic.vue'
import LoginView from './components/LoginView.vue'

export const router = createRouter({
    routes: [{
        path: '/', component: Home,
    }, {
        path: '/statistic', component: Statistic,
    }, {
        path: '/login', component: LoginView,
    }],
    history: createWebHistory()
})
