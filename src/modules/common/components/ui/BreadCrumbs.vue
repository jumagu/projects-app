<script setup lang="ts">
import FolderIcon from '../icons/FolderIcon.vue';
import AddFileIcon from '../icons/AddFileIcon.vue';

interface Props {
  name: string;
}

defineProps<Props>();
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

      <li>
        <span class="inline-flex items-center gap-2">
          <add-file-icon class="h-4 w-4" />
          {{ name }}
        </span>
      </li>
    </ul>
  </div>
</template>
