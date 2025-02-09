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
import store from '../services/store'

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
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "/CommentSection",
            name: "CommentSection",
            component: CommentSection,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "/Linea",
            name: "Linea",
            component: Linea,
            meta: {
              requiresAuth: true,
              role: "admin",
            },
          },
          {
            path: "/Corsa",
            name: "Corsa",
            component: Corsa,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "/Profilo",
            name: "Profilo",
            component: Profilo,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "/CreazionePost",
            name: "CreazionePost",
            component: CreazionePost,
            meta: {
              requiresAuth: true,
            },
          },
          {
            path: "/ModificaProfilo",
            name: "ModificaProfilo",
            component: ModificaProfilo,
            meta: {
              requiresAuth: true,
            },
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
});

// **Navigation Guard per protezione delle route**
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.state.isLoggedIn; 
    const userRole = store.state.role; 

    if (to.meta.requiresAuth) {
      if (!isAuthenticated) {
        return next('/LoginPage'); // Se non è autenticato, rimanda al login
      }
      if (to.meta.role && to.meta.role !== userRole) {
        return next('/'); // Se il ruolo non è autorizzato, rimanda alla home
      }
    }
    next();
});

export default router