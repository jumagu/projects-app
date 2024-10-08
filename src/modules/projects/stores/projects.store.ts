import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

import { v4 as uuidv4 } from 'uuid';

import type { IProject, ITask } from '../interfaces/project.interface';

export const useProjectsStore = defineStore('projects', () => {
  const projects = useLocalStorage<IProject[]>('projects', []);
  const projectList = computed(() =>
    projects.value.map((p) => ({
      ...p,
      completion:
        p.tasks.length === 0
          ? 0
          : (p.tasks.filter((t) => t.completedAt).length / p.tasks.length) * 100,
    })),
  );

  const findProjectById = (projectId: string): IProject | undefined => {
    const project = projects.value.find((p) => p.id === projectId);
    return project;
  };

  const findTaskById = (projectId: string, taskId: string): ITask | undefined => {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project) return undefined;
    const task = project.tasks.find((t) => t.id === taskId);
    return task;
  };

  const addProject = (name: string): void => {
    if (name.trim().length === 0) return;

    projects.value.push({
      id: uuidv4(),
      name,
      tasks: [],
    });
  };

  const addTaskToProject = (projectId: string, taskName: string) => {
    if (taskName.trim().length === 0) return;

    const project = findProjectById(projectId);

    if (!project) return;

    project.tasks.push({
      id: uuidv4(),
      name: taskName,
    });
  };

  const toggleTaskCompleted = (projectId: string, taskId: string) => {
    const task = findTaskById(projectId, taskId);
    if (!task) return;
    task.completedAt = task.completedAt ? undefined : new Date();
  };

  const deleteProject = (id: string) => {
    projects.value = projects.value.filter((p) => p.id !== id);
  };

  const deleteProjectTask = (projectId: string, taskId: string) => {
    const project = findProjectById(projectId);
    if (!project) return;
    project.tasks = project.tasks.filter((t) => t.id !== taskId);
  };

  const updateProjectName = (id: string, name: string) => {
    const project = findProjectById(id);
    if (!project) return;
    project.name = name;
  };

  const updateProjectTaskName = (projectId: string, taskId: string, taskName: string) => {
    const task = findTaskById(projectId, taskId);
    if (!task) return;
    task.name = taskName;
  };

  return {
    // ? Getters
    projectList,
    noProjects: computed(() => projects.value.length === 0),

    // ? Actions
    addProject,
    deleteProject,
    addTaskToProject,
    deleteProjectTask,
    updateProjectName,
    toggleTaskCompleted,
    updateProjectTaskName,
  };
});
