import { Timestamp } from "rxjs/internal/operators/timestamp";
import { timestamp } from "rxjs/operators";

export interface Project {
    // name: string;
    // status: string;
    // price: number;
    // category: string;
    // description: string;\
    // date: string;
    // message: string;
    // id = 0;
    //  message = '';
    //  completionStatus = false;
    //  edit = false;
    //  date: Date | null = null;
     id?: string,
     message: string,
     completionStatus?: boolean,
     edit?: boolean,
     date: string

  }

  export interface ProjectDTO {
    id: string;
    message: string;
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