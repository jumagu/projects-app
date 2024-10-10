<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import FolderIcon from '../icons/FolderIcon.vue';
import AddFileIcon from '../icons/AddFileIcon.vue';
import { useProjectsStore } from '@/modules/projects/stores/projects.store';
import type { IProject } from '@/modules/projects/interfaces/project.interface';

const route = useRoute();
const projectsStore = useProjectsStore();
const project = ref<IProject | undefined>(undefined);

watch(
  () => route.params.id,
  () => {
    project.value = projectsStore.findProjectById(route.params.id as string);
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li>
        <router-link to="/projects" class="inline-flex items-center gap-2">
          <folder-icon class="h-4 w-4" />
          Projects
        </router-link>
      </li>

      <li v-if="!!project">
        <span class="inline-flex items-center gap-2">
          <add-file-icon class="h-4 w-4" />
          {{ project.name }}
        </span>
      </li>
    </ul>
  </div>
</template>
