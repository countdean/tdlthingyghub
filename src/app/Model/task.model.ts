export interface Task {
    id?: string,
    message: string,
    completionStatus: boolean,
    edit: boolean,
    date: string
 }

 export interface TaskDTO {
    id: string;
    message: string;
    date: string;
  }

  export const TASK_DATA: Task[] = [
 
];