import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Inject, INJECTOR } from '@angular/core';
import { PTodoService } from './ptodo.service';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ProjectService } from '../Store/services/project/project.service';
import { Project, ProjectDTO } from '../Model/project.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskService } from '../Store/services/task/task.service';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabase } from '@angular/fire/database';
//import { ProjectService } from '../Store/services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

    sidePanelOpened = true;

    public showSidebar = false;
    formProject!: FormGroup;
    todoId = 6;
    copyTodos: Project[];
    /* search: 'all'; */
    selectedCategory = 'all';
    searchText: string | null = null;
    //searchText!: FormGroup;
    editSave = 'Edit';  
    // isEdit:boolean= false;

    todos: any[] = this.ptodoService.getProjects();

  constructor( 
    public fb: FormBuilder,
    public taskService: TaskService,
    public taskDialog: MatDialog,
    public ptodoService: PTodoService,
    private projectService: ProjectService ) {
        this.copyTodos = this.todos;
        this.formProject = this.fb.group({
            title: ['', Validators.required]
        });
   }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
}

mobileSidebar() {
    this.showSidebar = !this.showSidebar;
}

ngOnInit() {
    this.projectService.onFetchProject()
    
}

addProject(projectForm: FormGroupDirective) {
    this.projectService.addProject({
        message:  this.formProject.value.title,
        completionStatus: false,
        edit: false,
        date: new Date().toLocaleString()
    })
    projectForm.resetForm()
}

allTodos(): void {
    this.todos.forEach(todo => todo.completionStatus = (
        <HTMLInputElement>event!.target).checked);
}

selectionlblClick(val: string) {
    switch(val) {
        case 'all':
            this.copyTodos = this.todos;
            this.selectedCategory = 'all';
          break;
        case 'uncomplete':
            this.copyTodos = this.todos.filter(todo => !todo.completionStatus);
            this.selectedCategory = 'uncomplete';
          break;
          case 'compplete':
            this.copyTodos = this.todos.filter(x => x.completionStatus);
            this.selectedCategory = 'complete';
          break;
      }
}


openDialog(action: string, obj: any) {
    action = action;
    const dialogRef = this.taskDialog.open(TaskDialogComponent, {
        data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result.event === 'Add') {
            this.taskService.addTask(result.data);
        // } else if (result.event === 'Update') {
        //     this.updateRowData(result.data);
        // } else if (result.event === 'Delete') {
        //     this.deleteRowData(result.data);
         }
    });
}

editProject(index: number) {
    this.copyTodos[index].edit = true;
}


saveUpdatedTodo(project: ProjectDTO, index: number) {
    console.log(index)
    this.projectService.editProject(project).then(()=>{
    })
    this.copyTodos[index].edit = false;   
}

deleteTodo(project: ProjectDTO, index: number) {
    console.log(index);
    this.projectService.deleteProject(project).then(()=>{
    })
}

remainingList(): number {
    return this.todos.filter(todo => !todo.completionStatus).length;
}

}
