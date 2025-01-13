import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Social from '../views/Social.vue'
import CommentSection from '../views/CommentSection.vue'
import Linea from '../views/Linea.vue'
import Corsa from '../views/Corsa.vue'
import Profilo from '../views/Profilo.vue'
import CreazionePost from '../views/CreazionePost.vue'
import ModificaProfilo from '../views/ModificaProfilo.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
          {
            path: "/",
            name: "Home",
            component: Home,
          },
          {
            path: "/Social",
            name: "Social",
            component: Social,
          },
          {
            path: "/CommentSection",
            name: "CommentSection",
            component: CommentSection,
          },
          {
            path: "/Linea",
            name: "Linea",
            component: Linea,
          },
          {
            path: "/Corsa",
            name: "Corsa",
            component: Corsa,
          },
          {
            path: "/Profilo",
            name: "Profilo",
            component: Profilo,
          },
          {
            path: "/CreazionePost",
            name: "CreazionePost",
            component: CreazionePost,
          },
          {
            path: "/ModificaProfilo",
            name: "ModificaProfilo",
            component: ModificaProfilo,
          },
          {
            path: "/LoginPage",
            name: "LoginPage",
            component: LoginPage,
          },
          {
            path: "/RegisterPage",
            name: "RegisterPage",
            component: RegisterPage,
          },
    ]
})

export default router