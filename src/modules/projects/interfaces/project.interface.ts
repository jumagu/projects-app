export interface IProject {
  id: string;
  name: string;
  tasks: ITask[];
}

export interface ITask {
  id: string;
  name: string;
  completedAt?: Date;
}
