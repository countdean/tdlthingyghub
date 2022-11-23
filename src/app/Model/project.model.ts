import { Timestamp } from "rxjs/internal/operators/timestamp";
import { timestamp } from "rxjs/operators";

export interface Project {
     id?: string,
     name: string,
     completionStatus: boolean,
     edit: boolean,
     date: string
  }

  export interface ProjectDTO {
    id: string;
    name: string;
    date: string;
  }

  // export interface ProjectDTO {
  //   id: string;
  //   name: string;
  //   status: string;
  //   price: number;
  //   category: string;
  //   description: string;
  // }
  
  export const PROJECT_DATA: Project[] = [
 
  ];