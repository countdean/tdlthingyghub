import { Component, OnInit } from '@angular/core';
import { PTodoService } from './ptodo.service';
import { PToDo } from './ptodo';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  sidePanelOpened = true;

    public showSidebar = false;
    inputFg: FormGroup = Object.create(null);
    todoId = 6;
    copyTodos: PToDo[];
    /* search: 'all'; */
    selectedCategory = 'all';
    searchText: string | null = null;
    editSave = 'Edit';

    todos: PToDo[] = this.ptodoService.getTodos();


  
  constructor(public fb: FormBuilder, public ptodoService: PTodoService ) {
        this.copyTodos = this.todos;
   }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
}

mobileSidebar() {
    this.showSidebar = !this.showSidebar;
}

ngOnInit() {
    this.inputFg = this.fb.group({
        mess: []
    });
}

addTodo(value: string) {


    if (this.inputFg?.get('mess')?.value.trim().length === 0) {
        return;
    }

    this.todos.splice(0,0,
        {
            id: this.todoId,
            message: this.inputFg?.get('mess')?.value,
            completionStatus: false,
            edit: false,
            date: new Date()
        }
    );
    this.copyTodos = this.todos;

    this.todoId++;
    this.inputFg.patchValue({
        mess: '',
    });
}

allTodos(): void {
    this.todos.forEach(todo => todo.completionStatus = (
        <HTMLInputElement>event!.target).checked);
}

selectionlblClick(val: string) {

    if (val === 'all') {
        this.copyTodos = this.todos;
        this.selectedCategory = 'all';
    } else if (val === 'uncomplete') {
        this.copyTodos = this.todos.filter(todo => !todo.completionStatus);
        this.selectedCategory = 'uncomplete';
    } else if (val === 'complete') {
        this.copyTodos = this.todos.filter(x => x.completionStatus);
        this.selectedCategory = 'complete';
    }
}

editTodo(i: number, str: string) {
    if (this.copyTodos) {
        if (str === 'edit') {
            // tslint:disable-next-line: no-non-null-assertion
            this.copyTodos.find(x => x.id === i)!.edit = true;

        } else {
            // tslint:disable-next-line: no-non-null-assertion
            this.copyTodos.find(x => x.id === i)!.edit = false;

        }
    }
}

deleteTodo(id: number) {
    console.log(id);
    this.todos.splice(id, 1);



}

remainingList(): number {
    return this.todos.filter(todo => !todo.completionStatus).length;
}

}
