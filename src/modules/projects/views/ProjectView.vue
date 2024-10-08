<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useProjectsStore } from '../stores/projects.store';
import type { IProject } from '../interfaces/project.interface';
import PenIcon from '@/modules/common/components/icons/PenIcon.vue';
import InputModal from '@/modules/common/components/ui/InputModal.vue';
import BreadCrumbs from '@/modules/common/components/ui/BreadCrumbs.vue';
import ButtonCircle from '@/modules/common/components/ui/ButtonCircle.vue';
import AddCircleIcon from '@/modules/common/components/icons/AddCircleIcon.vue';
import TrashCanIcon from '@/modules/common/components/icons/TrashCanIcon.vue';

const route = useRoute();
const router = useRouter();
const projectsStore = useProjectsStore();

const modalOpen = ref(false);
const project = ref<IProject | undefined>(undefined);

const addTaskHandler = (taskName: string) => {
  if (!project.value) return;
  projectsStore.addTaskToProject(project.value.id, taskName);
};

const toggleTaskHandler = (taskId: string) => {
  if (!project.value) return;
  projectsStore.toggleTaskCompleted(project.value?.id, taskId);
};

watch(
  () => [route.params.id, projectsStore.projectList],
  () => {
    project.value = projectsStore.projectList.find((project) => project.id === route.params.id);
    if (!project.value) router.replace('/');
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <section class="mx-4">
    <bread-crumbs :name="project?.name ?? ''" />
  </section>

  <section>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Completed</th>
            <th>Name</th>
            <th>Completed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in project?.tasks" :key="task.id" class="hover">
            <th>{{ index + 1 }}</th>
            <td>
              <input
                type="checkbox"
                :checked="!!task.completedAt"
                @change="toggleTaskHandler(task.id)"
                class="checkbox checkbox-primary"
              />
            </td>
            <td>{{ task.name }}</td>
            <td>
              {{
                task.completedAt ? new Date(task.completedAt).toLocaleDateString() : '--/--/----'
              }}
            </td>
            <td>
              <button class="btn btn-circle btn-ghost btn-sm">
                <pen-icon class="w-5 h-5 text-accent" />
              </button>
              <button
                class="btn btn-circle btn-ghost btn-sm"
                @click="projectsStore.deleteProjectTask(project!.id, task.id)"
              >
                <trash-can-icon class="w-5 h-5 text-error" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <input-modal
      btn-text="Add"
      :title="'Add a new task to ' + project?.name"
      subtitle="Set a descriptive name"
      input-placeholder="Do something"
      :open="modalOpen"
      @close="modalOpen = false"
      @value="addTaskHandler"
    />

    <button-circle class="btn-primary fixed bottom-8 right-8" @click="modalOpen = true">
      <add-circle-icon />
    </button-circle>
  </section>
</template>
