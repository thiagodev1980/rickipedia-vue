<template>
  <div class="character-card" @click="$emit('click')">
    <div class="card-image-wrapper">
      <img :src="character.image" :alt="character.name" class="card-img" />
      <span :class="statusClass" class="status-badge">
        <span class="status-dot"></span>
        {{ character.status }}
      </span>
    </div>
    <div class="card-info">
      <h6 class="character-name">{{ character.name }}</h6>
      <p class="character-meta">{{ character.species }}</p>
      <p class="character-location">{{ character.location.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  character: {
    id: number
    name: string
    status: string
    species: string
    image: string
    location: { name: string }
  }
}>()

defineEmits(['click'])

const statusClass = computed(() => {
  if (props.character.status === 'Alive') return 'badge-alive'
  if (props.character.status === 'Dead') return 'badge-dead'
  return 'badge-unknown'
})
</script>

<style scoped>
.character-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s, box-shadow 0.25s;
  height: 100%;
}

.character-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
}

.card-image-wrapper {
  position: relative;
}

.card-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

.status-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.badge-alive {
  background: rgba(32, 201, 151, 0.15);
  color: #0d9e6e;
  border: 1px solid rgba(32, 201, 151, 0.4);
}

.badge-dead {
  background: rgba(220, 53, 69, 0.12);
  color: #c0392b;
  border: 1px solid rgba(220, 53, 69, 0.3);
}

.badge-unknown {
  background: rgba(108, 117, 125, 0.12);
  color: #6c757d;
  border: 1px solid rgba(108, 117, 125, 0.3);
}

.card-info {
  padding: 0.85rem 1rem;
}

.character-name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #1a1a2e;
  margin-bottom: 0.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.character-meta {
  font-size: 0.78rem;
  color: #6c757d;
  margin-bottom: 0.2rem;
}

.character-location {
  font-size: 0.72rem;
  color: #adb5bd;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
