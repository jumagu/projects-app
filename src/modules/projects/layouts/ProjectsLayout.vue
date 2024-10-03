<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import NavBar from '@/modules/common/components/ui/NavBar.vue';
</script>

<template>
  <div class="flex">
    <side-bar />

    <div class="flex-1 flex flex-col">
      <nav-bar />

      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>
