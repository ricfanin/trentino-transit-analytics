import { createRouter, createWebHistory } from 'vue-router'
// import esempioView from '../views/esempio.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // {
        //     path: '/',
        //     name: 'esempio',
        //     component: esempioView
        // }
    ]
})

export default router