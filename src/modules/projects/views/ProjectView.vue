<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useProjectsStore } from '../stores/projects.store';
import PenIcon from '@/modules/common/components/icons/PenIcon.vue';
import type { IProject, ITask } from '../interfaces/project.interface';
import InputModal from '@/modules/common/components/ui/InputModal.vue';
import CustomModal from '@/modules/common/components/ui/CustomModal.vue';
import ButtonCircle from '@/modules/common/components/ui/ButtonCircle.vue';
import AddTaskIcon from '@/modules/common/components/icons/AddTaskIcon.vue';
import TrashCanIcon from '@/modules/common/components/icons/TrashCanIcon.vue';

const route = useRoute();
const router = useRouter();
const projectsStore = useProjectsStore();

const modalDeleteOpen = ref(false);
const taskToDelete = ref<ITask>();
const project = ref<IProject | undefined>(undefined);
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
  inputPlaceholder: 'Do something',
});

const addTaskHandler = () => {
  if (!project.value) return;
  modalState.value = {
    ...modalState.value,
    open: true,
    title: 'Add a new task to ' + project.value.name,
    value: '',
    btnText: 'Add',
    onValue: (value) => {
      if (!project.value) return;
      projectsStore.addTaskToProject(project.value.id, value);
    },
  };
};

const updateTaskHandler = (id: string, name: string) => {
  if (!project.value) return;
  modalState.value = {
    ...modalState.value,
    open: true,
    title: `Editing task: ${name}`,
    value: name,
    btnText: 'Update',
    onValue: (value) => {
      if (!project.value) return;
      console.log({ value });
      projectsStore.updateProjectTaskName(project.value.id, id, value);
    },
  };
};

const deleteTaskHandler = (task: ITask) => {
  taskToDelete.value = task;
  modalDeleteOpen.value = true;
};

const confirmTaskDeletionHandler = () => {
  if (!taskToDelete.value || !project.value) return;
  projectsStore.deleteProjectTask(project.value.id, taskToDelete.value.id);
  modalDeleteOpen.value = false;
};

const toggleTaskHandler = (taskId: string) => {
  if (!project.value) return;
  projectsStore.toggleTaskCompleted(project.value.id, taskId);
};

watch(
  () => [route.params.id, projectsStore.projectList],
  () => {
    project.value = projectsStore.findProjectById(route.params.id as string);
    if (!project.value) router.replace('/');
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <section>
    <div class="h-[calc(100vh-84px)] overflow-x-auto">
      <table v-if="project?.tasks.length ?? 0 > 0" class="table table-pin-rows">
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
              <button
                class="btn btn-circle btn-ghost btn-sm"
                @click="updateTaskHandler(task.id, task.name)"
              >
                <pen-icon class="w-5 h-5 text-accent" />
              </button>
              <button class="btn btn-circle btn-ghost btn-sm" @click="deleteTaskHandler(task)">
                <trash-can-icon class="w-5 h-5 text-error" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="h-full flex flex-col justify-center items-center">
        <img
          class="w-36 brightness-75 pointer-events-none"
          src="../../../assets/images/to-do-list.png"
          alt="Empty Folder"
        />
        <p class="text-xl font-semibold my-2">No task added yet</p>
        <p>Click the rounded button to add one</p>
      </div>
    </div>

    <input-modal v-bind="modalState" @close="modalState.open = false" />
    <custom-modal :open="modalDeleteOpen" @close="modalDeleteOpen = false">
      <template #header>
        <h3 class="text-lg font-bold mb-2">
          Are you sure to delete the task '{{ taskToDelete?.name }}'?
        </h3>
        <p>This action cannot be undone</p>
      </template>
      <template #actions>
        <button class="btn btn-error" @click="confirmTaskDeletionHandler">Confirm</button>
      </template>
    </custom-modal>

    <button-circle class="btn-primary fixed bottom-8 right-8" @click="addTaskHandler">
      <add-task-icon class="w-10 h-10" />
    </button-circle>
  </section>
</template>
