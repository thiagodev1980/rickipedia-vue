<template>
  <div class="area-busca">
    <div class="input-group">
      <input
        type="text"
        class="form-control campo-busca"
        placeholder="Buscar personagem..."
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keyup.enter="$emit('buscar')"
      />
      <button class="btn btn-buscar" @click="$emit('buscar')">
        Buscar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits(['update:modelValue', 'buscar'])
</script>

<style scoped>
.area-busca {
  max-width: 550px;
  margin: 0 auto 2rem;
}

.campo-busca {
  border: 2px solid #dee2e6;
  border-right: none;
  border-radius: 8px 0 0 8px;
  padding: 0.65rem 1rem;
  font-size: 0.95rem;
  transition: border-color 0.2s;
}

.campo-busca:focus {
  border-color: #20c997;
  box-shadow: none;
}

.btn-buscar {
  background-color: #20c997;
  color: white;
  border-radius: 0 8px 8px 0;
  padding: 0.65rem 1.4rem;
  font-weight: 600;
  transition: background-color 0.2s;
}

.btn-buscar:hover {
  background-color: #17a589;
  color: white;
}
</style>
