import { createRouter, createWebHistory } from 'vue-router'
import CharacterListView from '../views/CharacterListView.vue'
import CharacterDetailView from '../views/CharacterDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: CharacterListView },
    { path: '/character/:id', component: CharacterDetailView },
  ],
})

export default router
