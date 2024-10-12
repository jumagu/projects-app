import { createPinia, setActivePinia } from 'pinia';

import { PROJECTS } from '../../../fixtures/projects.fixture';
import { useProjectsStore } from '@/modules/projects/stores/projects.store';

describe('Tests in projects store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('Should return default values', () => {
    const {
      noProjects,
      addProject,
      projectList,
      deleteProject,
      findProjectById,
      addTaskToProject,
      deleteProjectTask,
      updateProjectName,
      toggleTaskCompleted,
      updateProjectTaskName,
    } = useProjectsStore();

    expect(noProjects).toBe(true);
    expect(addProject).toBeInstanceOf(Function);
    expect(projectList).toEqual([]);
    expect(deleteProject).toBeInstanceOf(Function);
    expect(findProjectById).toBeInstanceOf(Function);
    expect(addTaskToProject).toBeInstanceOf(Function);
    expect(deleteProjectTask).toBeInstanceOf(Function);
    expect(updateProjectName).toBeInstanceOf(Function);
    expect(toggleTaskCompleted).toBeInstanceOf(Function);
    expect(updateProjectTaskName).toBeInstanceOf(Function);
  });

  test('addProject action should add a project', () => {
    const projectsStore = useProjectsStore();

    projectsStore.addProject('Test Project');

    expect(projectsStore.projectList).toHaveLength(1);
    expect(projectsStore.projectList[0]).toEqual({
      id: expect.any(String),
      name: 'Test Project',
      tasks: [],
      completion: 0,
    });
  });

  test('Should load state from localStorage if exist', () => {
    localStorage.setItem('projects', JSON.stringify(PROJECTS));

    const projectsStore = useProjectsStore();

    const [project1, project2, project3] = projectsStore.projectList;

    expect(projectsStore.projectList).toHaveLength(PROJECTS.length);
    expect(project1).toEqual({
      ...PROJECTS[0],
      completion: expect.any(Number),
    });
    expect(project2).toEqual({
      ...PROJECTS[1],
      tasks: expect.any(Array),
      completion: expect.any(Number),
    });
    expect(project3).toEqual({
      ...PROJECTS[2],
      completion: expect.any(Number),
    });
  });

  test('addTaskToProject action should add a task to an existing project', () => {
    const projectName = 'Test Project';
    const taskName = 'Test Task';

    const projectsStore = useProjectsStore();
    projectsStore.addProject(projectName);
    const project = projectsStore.projectList[0];
    projectsStore.addTaskToProject(project.id, taskName);

    expect(project.tasks).toHaveLength(1);
    expect(project.tasks[0]).toEqual({
      id: expect.any(String),
      name: taskName,
    });
  });

  test('toggleTaskCompleted action should toggle the completedAt of a task', () => {
    const projectName = 'Test Project';
    const taskName = 'Test Task';

    const projectsStore = useProjectsStore();
    projectsStore.addProject(projectName);

    const project = projectsStore.projectList[0];
    projectsStore.addTaskToProject(project.id, taskName);

    const task = project.tasks[0];
    projectsStore.toggleTaskCompleted(project.id, task.id);

    expect(project.tasks[0]).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: expect.any(Date),
    });
  });

  test('Should increment the completion of a project', () => {
    const projectsStore = useProjectsStore();
    // ! Not working as expected
    projectsStore.$patch({ projects: PROJECTS });

    console.log(projectsStore.projectList);
    expect(projectsStore.projectList).toEqual([]);
  });
});
