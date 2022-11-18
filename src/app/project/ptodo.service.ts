import { Injectable } from '@angular/core';
import { PToDo } from './ptodo';
// import { ptodos } from './ptodo-data';
import { PROJECT_DATA } from '../Model/project.model';
import { Project } from '../Model/project.model';




@Injectable()
export class PTodoService {

    public todos: Project[] = PROJECT_DATA;


    public getTodos() {
        return this.todos;
    }
}
