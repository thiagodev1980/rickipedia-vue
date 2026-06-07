import { createRouter, createWebHistory } from 'vue-router'
import ListaPersonagens from '../views/ListaPersonagens.vue'
import DetalhesPersonagem from '../views/DetalhesPersonagem.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: ListaPersonagens },
    { path: '/personagem/:id', component: DetalhesPersonagem },
  ],
})

export default router