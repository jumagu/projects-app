<script setup lang="ts">
defineEmits(['click']);
</script>

<template>
  <button class="btn btn-circle" @click="$emit('click')">
    <slot />
  </button>
</template>
