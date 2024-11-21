import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
          },
          {
            path: "/Social",
            name: "Social",
            component: () => import("../views/Social.vue"),
          },
          {
            path: "/Linea",
            name: "Linea",
            component: () => import("../views/Linea.vue"),
          },
          {
            path: "/Corsa",
            name: "Corsa",
            component: () => import("../views/Corsa.vue"),
          },
          {
            path: "/Profilo",
            name: "Profilo",
            component: () => import("../views/Profilo.vue"),
          },
          {
            path: "/CreazionePost",
            name: "CreazionePost",
            component: () => import("../views/CreazionePost.vue"),
          },
          {
            path: "/ModificaProfilo",
            name: "ModificaProfilo",
            component: () => import("../views/ModificaProfilo.vue"),
          },
          {
            path: "/LoginPage",
            name: "LoginPage",
            component: () => import("../views/LoginPage.vue"),
          },
          {
            path: "/RegisterPage",
            name: "RegisterPage",
            component: () => import("../views/RegisterPage.vue"),
          },
    ]
})

export default router