<template>
  <div class="page-wrapper">

    <!-- Cabecalho -->
    <header class="app-header">
      <h1 class="app-title">Rick and Morty</h1>
      <p class="app-subtitle">Base de dados de personagens</p>
    </header>

    <div class="container py-4">

      <!-- Botao voltar -->
      <button class="btn-voltar mb-4" @click="$router.back()">
        &larr; Voltar para a lista
      </button>

      <!-- Spinner -->
      <div v-if="carregando" class="text-center my-5">
        <div class="spinner-border text-success" role="status"></div>
        <p class="mt-3 text-muted">Carregando...</p>
      </div>

      <!-- Detalhes -->
      <div v-else-if="personagem" class="detalhe-card">

        <!-- Foto e status -->
        <div class="detalhe-foto-col">
          <img :src="personagem.image" :alt="personagem.name" class="detalhe-foto" />
          <span :class="statusClass" class="detalhe-status">
            <span class="status-dot"></span>
            {{ personagem.status }}
          </span>
        </div>

        <!-- Informacoes -->
        <div class="detalhe-info-col">
          <h2 class="detalhe-nome">{{ personagem.name }}</h2>

          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Especie</span>
              <span class="info-valor">{{ personagem.species }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Genero</span>
              <span class="info-valor">{{ personagem.gender }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Origem</span>
              <span class="info-valor">{{ personagem.origin.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Localizacao atual</span>
              <span class="info-valor">{{ personagem.location.name }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Aparece em</span>
              <span class="info-valor">{{ personagem.episode.length }} episodios</span>
            </div>
            <div class="info-item" v-if="personagem.type">
              <span class="info-label">Tipo</span>
              <span class="info-valor">{{ personagem.type }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const personagem = ref<any>(null)
const carregando = ref(true)

const statusClass = computed(() => {
  if (personagem.value?.status === 'Alive') return 'status-alive'
  if (personagem.value?.status === 'Dead') return 'status-dead'
  return 'status-unknown'
})

async function buscarPersonagem() {
  try {
    const id = route.params.id
    const resposta = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    personagem.value = await resposta.json()
  } catch (e) {
    console.error('Erro ao buscar personagem')
  } finally {
    carregando.value = false
  }
}

onMounted(buscarPersonagem)
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
  margin-bottom: 0.3rem;
}

.app-subtitle {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.btn-voltar {
  background: white;
  border: 2px solid #20c997;
  color: #20c997;
  padding: 0.5rem 1.3rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-voltar:hover {
  background: #20c997;
  color: white;
}

.detalhe-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

.detalhe-foto-col {
  position: relative;
  width: 300px;
  flex-shrink: 0;
}

.detalhe-foto {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-height: 300px;
}

.detalhe-status {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.status-alive {
  background: rgba(32, 201, 151, 0.15);
  color: #0d9e6e;
  border: 1px solid rgba(32, 201, 151, 0.4);
}

.status-dead {
  background: rgba(220, 53, 69, 0.12);
  color: #c0392b;
  border: 1px solid rgba(220, 53, 69, 0.3);
}

.status-unknown {
  background: rgba(108, 117, 125, 0.12);
  color: #6c757d;
  border: 1px solid rgba(108, 117, 125, 0.3);
}

.detalhe-info-col {
  flex: 1;
  padding: 2rem;
  min-width: 280px;
}

.detalhe-nome {
  font-size: 1.9rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #adb5bd;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.info-valor {
  font-size: 0.95rem;
  color: #1a1a2e;
  font-weight: 500;
}

@media (max-width: 600px) {
  .detalhe-foto-col {
    width: 100%;
  }
  .detalhe-foto {
    min-height: 250px;
  }
}
</style>
