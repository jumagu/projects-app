import type { IProject } from '@/modules/projects/interfaces/project.interface';

export const PROJECTS: IProject[] = [
  {
    id: '1',
    name: 'Project #1',
    tasks: [{ id: '1', name: 'Task #1' }],
  },
  {
    id: '2',
    name: 'Project #2',
    tasks: [
      { id: '1', name: 'Task #1' },
      { id: '2', name: 'Task #2' },
      { id: '3', name: 'Task #3', completedAt: new Date() },
    ],
  },
  {
    id: '3',
    name: 'Project #3',
    tasks: [{ id: '1', name: 'Task #1' }],
  },
];
