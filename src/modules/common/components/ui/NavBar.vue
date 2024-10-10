<script setup lang="ts">
import MenuIcon from '../icons/MenuIcon.vue';
import ThemeController from './ThemeController.vue';
</script>

<template>
  <div class="flex items-center justify-between px-3 py-2 bg-base-300">
    <div class="flex items-center">
      <label for="my-drawer" class="btn btn-square btn-sm btn-ghost drawer-button lg:hidden">
        <menu-icon class="inline-block h-5 w-5 md:h-6 md:w-6" />
      </label>
      <h2 class="pl-1 text-lg font-bold text-blue-600">Notion</h2>
    </div>
    <theme-controller />
  </div>
</template>
