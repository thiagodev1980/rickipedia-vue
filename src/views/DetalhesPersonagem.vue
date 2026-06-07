<template>
  <div class="pagina">

    <header class="cabecalho">
      <h1 class="titulo">Rick and Morty</h1>
      <p class="subtitulo">Base de dados de personagens</p>
    </header>

    <div class="container py-4">

      <button class="btn-voltar mb-4" @click="$router.back()">
        &larr; Voltar para a lista
      </button>

      <div v-if="carregando" class="text-center my-5">
        <div class="spinner-border text-success" role="status"></div>
        <p class="mt-3 text-muted">Carregando...</p>
      </div>

      <div v-else-if="personagem" class="cartao-detalhe">

        <div class="coluna-foto">
          <img :src="personagem.image" :alt="personagem.name" class="foto-detalhe" />
        </div>

        <div class="coluna-informacoes">
          <h2 class="nome-detalhe">{{ personagem.name }}</h2>

          <div class="lista-informacoes">
            <div class="linha-informacao">
              <span class="rotulo">Situacao</span>
              <span :class="statusClasse" class="valor-status">
                <em><strong>{{ traduzirStatus(personagem.status) }}</strong></em>
              </span>
            </div>
            <div class="linha-informacao">
              <span class="rotulo">Especie</span>
              <span class="valor">{{ personagem.species }}</span>
            </div>
            <div class="linha-informacao">
              <span class="rotulo">Genero</span>
              <span class="valor">{{ traduzirGenero(personagem.gender) }}</span>
            </div>
            <div class="linha-informacao">
              <span class="rotulo">Origem</span>
              <span class="valor">{{ personagem.origin.name }}</span>
            </div>
            <div class="linha-informacao">
              <span class="rotulo">Localizacao atual</span>
              <span class="valor">{{ personagem.location.name }}</span>
            </div>
            <div class="linha-informacao">
              <span class="rotulo">Aparece em</span>
              <span class="valor">{{ personagem.episode.length }} episodios</span>
            </div>
            <div v-if="personagem.type" class="linha-informacao">
              <span class="rotulo">Tipo</span>
              <span class="valor">{{ personagem.type }}</span>
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

function traduzirStatus(status: string) {
  if (status === 'Alive') return 'Vivo'
  if (status === 'Dead') return 'Morto'
  return 'Desconhecido'
}

function traduzirGenero(genero: string) {
  if (genero === 'Male') return 'Masculino'
  if (genero === 'Female') return 'Feminino'
  if (genero === 'Genderless') return 'Sem genero'
  return 'Desconhecido'
}

const statusClasse = computed(() => {
  if (personagem.value?.status === 'Alive') return 'status-vivo'
  if (personagem.value?.status === 'Dead') return 'status-morto'
  return 'status-desconhecido'
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
.pagina {
  min-height: 100vh;
  background-color: #f4f6f9;
}

.cabecalho {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: white;
  text-align: center;
  padding: 2.5rem 1rem;
}

.titulo {
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 0.3rem;
}

.subtitulo {
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

.cartao-detalhe {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
}

.coluna-foto {
  width: 300px;
  flex-shrink: 0;
}

.foto-detalhe {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-height: 300px;
}

.coluna-informacoes {
  flex: 1;
  padding: 2rem;
  min-width: 280px;
}

.nome-detalhe {
  font-size: 1.9rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 1.5rem;
}

.lista-informacoes {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.linha-informacao {
  display: flex;
  flex-direction: column;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid #f0f0f0;
}

.linha-informacao:last-child {
  border-bottom: none;
}

.rotulo {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #adb5bd;
  font-weight: 600;
  margin-bottom: 0.2rem;
}

.valor {
  font-size: 0.95rem;
  color: #1a1a2e;
  font-weight: 500;
}

.valor-status {
  font-size: 0.95rem;
}

.status-vivo {
  color: #0d9e6e;
}

.status-morto {
  color: #c0392b;
}

.status-desconhecido {
  color: #6c757d;
}

@media (max-width: 600px) {
  .coluna-foto {
    width: 100%;
  }
  .foto-detalhe {
    min-height: 250px;
  }
}
</style>
