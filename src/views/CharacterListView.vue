<template>
  <div class="page-wrapper">

    <!-- Cabecalho -->
    <header class="app-header">
      <h1 class="app-title">Rick and Morty</h1>
      <p class="app-subtitle">Base de dados de personagens</p>
    </header>

    <div class="container py-4">

      <!-- Barra de busca -->
      <SearchBar v-model="busca" @buscar="pesquisar" />

      <!-- Mensagem de erro -->
      <div v-if="erro" class="alert alert-warning text-center">{{ erro }}</div>

      <!-- Spinner de carregamento -->
      <div v-if="carregando" class="text-center my-5">
        <div class="spinner-border text-success" role="status"></div>
        <p class="mt-3 text-muted">Carregando personagens...</p>
      </div>

      <!-- Grade de personagens -->
      <div v-else class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
        <div v-for="personagem in personagens" :key="personagem.id" class="col">
          <CharacterCard
            :character="personagem"
            @click="$router.push('/character/' + personagem.id)"
          />
        </div>
      </div>

      <!-- Paginacao -->
      <div v-if="totalPaginas > 1" class="paginacao">
        <button
          class="btn-pagina"
          :disabled="paginaAtual === 1"
          @click="mudarPagina(paginaAtual - 1)"
        >
          Anterior
        </button>

        <span class="pagina-info">{{ paginaAtual }} / {{ totalPaginas }}</span>

        <button
          class="btn-pagina"
          :disabled="paginaAtual === totalPaginas"
          @click="mudarPagina(paginaAtual + 1)"
        >
          Proxima
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import CharacterCard from '@/components/CharacterCard.vue'

const personagens = ref([])
const busca = ref('')
const paginaAtual = ref(1)
const totalPaginas = ref(1)
const carregando = ref(false)
const erro = ref('')

async function buscarPersonagens() {
  carregando.value = true
  erro.value = ''

  try {
    const url = `https://rickandmortyapi.com/api/character?page=${paginaAtual.value}&name=${busca.value}`
    const resposta = await fetch(url)

    if (resposta.status === 404) {
      personagens.value = []
      totalPaginas.value = 1
      erro.value = 'Nenhum personagem encontrado.'
      return
    }

    const dados = await resposta.json()
    personagens.value = dados.results
    totalPaginas.value = dados.info.pages
  } catch (e) {
    erro.value = 'Erro ao buscar personagens. Tente novamente.'
  } finally {
    carregando.value = false
  }
}

function pesquisar() {
  paginaAtual.value = 1
  buscarPersonagens()
}

function mudarPagina(pagina: number) {
  paginaAtual.value = pagina
  buscarPersonagens()
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(buscarPersonagens)
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background-color: #f4f6f9;
}

.app-header {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
  text-align: center;
  padding: 2.5rem 1rem;
}

.app-title {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  margin-bottom: 0.3rem;
}

.app-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.paginacao {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2.5rem;
}

.btn-pagina {
  background: white;
  border: 2px solid #20c997;
  color: #20c997;
  padding: 0.5rem 1.3rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.88rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-pagina:hover:not(:disabled) {
  background: #20c997;
  color: white;
}

.btn-pagina:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.pagina-info {
  font-size: 0.9rem;
  color: #6c757d;
  font-weight: 500;
  min-width: 70px;
  text-align: center;
}
</style>
