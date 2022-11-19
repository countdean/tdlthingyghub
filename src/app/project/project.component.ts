import { BreakpointObserver } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Inject } from '@angular/core';
import { PTodoService } from './ptodo.service';
import { PToDo } from './ptodo';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { ProjectService } from '../Store/services/project/project.service';
import { Project } from '../Model/project.model';

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
    inputFg!: FormGroup;
    todoId = 6;
    copyTodos: Project[];
    /* search: 'all'; */
    selectedCategory = 'all';
    searchText: string | null = null;
    //searchText!: FormGroup;
    editSave = 'Edit';
    // isEdit:boolean= false;

    todos: any[] = this.ptodoService.getTodos();

    // _projectForm!: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    //public projectData: Project,
    public ptodoService: PTodoService,
    private projectService: ProjectService ) {
        this.copyTodos = this.todos;
        this.inputFg = this.fb.group({
            mess: ['', Validators.required]
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
    //console.log("AAAAAAAAAAAAAAAAA",this.projectService)
    //this.projectForm()
}


// projectForm(){
//     var isEdit = this.projectService.isEdit;
//     this._projectForm = this.formBuilder.group({
//       name: new FormControl(isEdit?this.equipmentData.name:"", Validators.required),
//       status: new FormControl(isEdit?this.equipmentData.status:"", Validators.required),
//       price: new FormControl(isEdit?this.equipmentData.price:"", [
//         Validators.required,
//         RxwebValidators.numeric({allowDecimal:true,isFormat:true})  
//       ]),
//       category: new FormControl(isEdit?this.equipmentData.category:"", Validators.required),
//       description: new FormControl(isEdit?this.equipmentData.description:"", Validators.required),
//      });
//   }

addTodo(formDirective: FormGroupDirective, value?: string ) {
    if (this.inputFg?.get('mess')?.value.trim().length === 0) {
        return;
    }
    this.todos.splice(0,0,
        {
            //id: this.todoId,
            // message: this.inputFg?.get('mess')?.value,
            message: this.inputFg.value.mess,
            completionStatus: false,
            edit: false,
            date: new Date().toLocaleString()
        }
    );
        this.copyTodos = this.todos;
        console.log("mess data",this.inputFg.value)
        this.projectService.onAddProject({
        message:  this.inputFg.value.mess,
        completionStatus: false,
        edit: false,
        date: new Date().toLocaleString()
        
     })
     formDirective.resetForm();
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


editTodo(data: any) {
    //console.log("AAAAAAAAAAAAA", data)
    this.projectService.toEditData = data;
    this.copyTodos.forEach(todo=>{
        if(this.copyTodos.indexOf(todo) == this.copyTodos.indexOf(data)){
            this.copyTodos[this.copyTodos.indexOf(todo)].edit = true;
        } 
    });
    
}

saveUpdatedTodo(data: any) {
   console.log("=========",this.projectService.toEditData, data)
   this.copyTodos.forEach(todo=>{
    if(this.copyTodos.indexOf(todo) == this.copyTodos.indexOf(data)){
        this.copyTodos[this.copyTodos.indexOf(todo)].edit = false;
    } 
});
    this.projectService.onEditProject(this.projectService.toEditData, data).then(()=>{
        
    })
   
    //this.copyTodos = PROJECT_DATA;
}

onEditProject(formDirective: FormGroupDirective){
    this.projectService.isEdit = false;
    this.projectService.onEditProject(this.projectService.toEditData, this.inputFg.value).then(()=>{
      //this.sharedService.openSnackBar("Equipment Edited Successfuly", "Ok");
    })
    //this.clearForm(formDirective)
  }


deleteTodo(id: number) {
    console.log(id);
    this.todos.splice(id, 1);
}

remainingList(): number {
    return this.todos.filter(todo => !todo.completionStatus).length;
}

}
