<template>
  <div class="card-personagem" @click="$emit('click')">
    <div class="card-foto-wrapper">
      <img :src="personagem.image" :alt="personagem.name" class="card-foto" />
    </div>
    <div class="card-informacoes">
      <h6 class="card-nome">{{ personagem.name }}</h6>
      <p class="card-especie">{{ personagem.species }}</p>
      <p :class="statusClasse" class="card-status">
        <em><strong>{{ traduzirStatus(personagem.status) }}</strong></em>
      </p>
      <p class="card-localizacao">{{ personagem.location.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  personagem: {
    id: number
    name: string
    status: string
    species: string
    image: string
    location: { name: string }
  }
}>()

defineEmits(['click'])

function traduzirStatus(status: string) {
  if (status === 'Alive') return 'Vivo'
  if (status === 'Dead') return 'Morto'
  return 'Desconhecido'
}

const statusClasse = computed(() => {
  if (props.personagem.status === 'Alive') return 'status-vivo'
  if (props.personagem.status === 'Dead') return 'status-morto'
  return 'status-desconhecido'
})
</script>

<style scoped>
.card-personagem {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s, box-shadow 0.25s;
  height: 100%;
}

.card-personagem:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
}

.card-foto-wrapper {
  position: relative;
}

.card-foto {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

.card-informacoes {
  padding: 0.85rem 1rem;
}

.card-nome {
  font-weight: 700;
  font-size: 0.95rem;
  color: #1a1a2e;
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-especie {
  font-size: 0.78rem;
  color: #6c757d;
  margin-bottom: 0.2rem;
}

.card-status {
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  padding: 2px 0;
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

.card-localizacao {
  font-size: 0.72rem;
  color: #adb5bd;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
