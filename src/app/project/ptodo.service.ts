import { Injectable } from '@angular/core';
import { PToDo } from './ptodo';
import { ptodos } from './ptodo-data';



@Injectable()
export class PTodoService {

    public todos: PToDo[] = ptodos;


    public getTodos() {
        return this.todos;
    }
}
