<script setup lang="ts">
import { ref } from 'vue';

import InputModal from '@/modules/common/components/ui/InputModal.vue';
import ButtonCircle from '@/modules/common/components/ui/ButtonCircle.vue';
import AddCircleIcon from '@/modules/common/components/icons/AddCircleIcon.vue';
import CustomModal from '@/modules/common/components/ui/CustomModal.vue';

const modalOpen = ref(false);

const addProjectHandler = (projectName: string) => {
  console.log({ projectName });
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Project</th>
          <th>Tasks</th>
          <th>Progress</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 2 -->
        <tr class="hover">
          <th>2</th>
          <td>Hart Hagerty</td>
          <td>Desktop Support Technician</td>
          <td>Purple</td>
        </tr>
      </tbody>
    </table>
  </div>

  <input-modal
    btn-text="Add"
    title="Add a new project"
    subtitle="Set a descriptive name"
    input-placeholder="Name of the project"
    :open="modalOpen"
    @close="modalOpen = false"
    @value="addProjectHandler"
  />

  <custom-modal :open="true">
    <template #header>
      <h1>Hola Mundo</h1>
    </template>

    <template #body>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste est modi facere enim? Amet
      recusandae accusamus animi, ducimus a ratione eligendi impedit deleniti error, soluta quos
      exercitationem dignissimos quod voluptas.
    </template>

    <template #actions>
      <button class="btn btn-accent">close</button>
    </template>
  </custom-modal>

  <button-circle class="btn-primary fixed bottom-8 right-8" @click="modalOpen = true">
    <add-circle-icon />
  </button-circle>
</template>
