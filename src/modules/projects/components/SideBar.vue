<script setup lang="ts">
import { useProjectsStore } from '../stores/projects.store';

const projectsStore = useProjectsStore();

const clickItemHanlder = () => {
  const drawer = document.getElementById('my-drawer') as HTMLInputElement;
  drawer.checked = false;
};
</script>

<template>
  <aside class="bg-base-200 h-full w-60">
    <div class="h-11 w-full py-2 px-3">
      <router-link class="flex items-center" to="/">
        <img class="w-8" src="../../../assets/logo.svg" alt="Projects Logo" />
        <h2 class="text-lg font-bold ml-2">Projects</h2>
      </router-link>
    </div>

    <p v-if="projectsStore.noProjects" class="text-sm text-gray-500 p-4">There are no projects</p>

    <ul v-else class="menu rounded-box h-[calc(100%-44px)] overflow-y-scroll">
      <li v-for="project in projectsStore.projectList" :key="project.id">
        <details v-if="project.tasks.length > 0">
          <summary>
            <router-link :to="`/project/${project.id}`" class="truncate">
              <span class="truncate">
                {{ project.name }}
              </span>
            </router-link>
          </summary>
          <ul>
            <li v-for="task in project.tasks" :key="task.id" @click="clickItemHanlder">
              <router-link :to="`/project/${project.id}`">
                <span class="truncate">{{ task.name }}</span>
              </router-link>
            </li>
          </ul>
        </details>

        <router-link v-else :to="`/project/${project.id}`" @click="clickItemHanlder">
          <span class="truncate">
            {{ project.name }}
          </span>
        </router-link>
      </li>
    </ul>
  </aside>
</template>
