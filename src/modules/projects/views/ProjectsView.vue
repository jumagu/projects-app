<script setup lang="ts">
import { ref } from 'vue';

import { useProjectsStore } from '../stores/projects.store';
import type { IProject } from '../interfaces/project.interface';
import PenIcon from '@/modules/common/components/icons/PenIcon.vue';
import InputModal from '@/modules/common/components/ui/InputModal.vue';
import CustomModal from '@/modules/common/components/ui/CustomModal.vue';
import ButtonCircle from '@/modules/common/components/ui/ButtonCircle.vue';
import TrashCanIcon from '@/modules/common/components/icons/TrashCanIcon.vue';
import AddCircleIcon from '@/modules/common/components/icons/AddCircleIcon.vue';

const modalDeleteOpen = ref(false);
const modalState = ref<{
  open: boolean;
  title: string;
  value?: string;
  btnText: string;
  subtitle: string;
  inputPlaceholder: string;
  onValue?: (value: string) => void;
}>({
  open: false,
  title: '',
  btnText: '',
  subtitle: 'Set a descriptive name',
  inputPlaceholder: 'Name of the project',
});
const projectToDelete = ref<IProject>();

const projectsStore = useProjectsStore();

const addProjectHandler = () => {
  modalState.value = {
    ...modalState.value,
    open: true,
    title: 'Add a new project',
    value: '',
    btnText: 'Add',
    onValue: (value) => projectsStore.addProject(value),
  };
};

const updateProjectHandler = (id: string, name: string) => {
  modalState.value = {
    ...modalState.value,
    open: true,
    title: `Editing project: ${name}`,
    value: name,
    btnText: 'Update',
    onValue: (value) => projectsStore.updateProjectName(id, value),
  };
};

const deleteProjectHandler = (project: IProject) => {
  projectToDelete.value = project;
  modalDeleteOpen.value = true;
};

const confirmProjectDeletionHandler = () => {
  if (!projectToDelete.value) return;
  projectsStore.deleteProject(projectToDelete.value.id);
  modalDeleteOpen.value = false;
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Project</th>
          <th>Tasks</th>
          <th>Progress</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projectsStore.projectList" :key="project.id" class="hover">
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.tasks.length }}</td>
          <td>
            <progress
              max="100"
              :value="project.completion"
              class="progress progress-primary w-auto"
            ></progress>
          </td>
          <td>
            <button
              class="btn btn-circle btn-ghost btn-sm"
              @click="updateProjectHandler(project.id, project.name)"
            >
              <pen-icon class="w-5 h-5 text-accent" />
            </button>
            <button class="btn btn-circle btn-ghost btn-sm" @click="deleteProjectHandler(project)">
              <trash-can-icon class="w-5 h-5 text-error" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <input-modal v-bind="modalState" @close="modalState.open = false" />
  <custom-modal :open="modalDeleteOpen" @close="modalDeleteOpen = false">
    <template #header>
      <h3 class="text-lg font-bold mb-2">
        Are you sure to delete the project '{{ projectToDelete?.name }}'?
      </h3>
      <p>This action cannot be undone</p>
    </template>
    <template #actions>
      <button class="btn btn-error" @click="confirmProjectDeletionHandler">Confirm</button>
    </template>
  </custom-modal>

  <button-circle class="btn-primary fixed bottom-8 right-8" @click="addProjectHandler">
    <add-circle-icon />
  </button-circle>
</template>
