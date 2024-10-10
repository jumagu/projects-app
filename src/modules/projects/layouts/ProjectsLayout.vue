<script setup lang="ts">
import SideBar from '../components/SideBar.vue';
import NavBar from '@/modules/common/components/ui/NavBar.vue';
import BreadCrumbs from '@/modules/common/components/ui/BreadCrumbs.vue';
</script>

<template>
  <div class="drawer lg:drawer-open">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <div class="flex-1 flex flex-col">
        <nav-bar />
        <main>
          <section class="mx-4">
            <bread-crumbs />
          </section>
          <router-view />
        </main>
      </div>
    </div>
    <div class="drawer-side z-[2]">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <side-bar />
    </div>
  </div>
</template>
