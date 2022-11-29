import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './models/projects.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { Task } from './models/tasks.model';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DataSource } from '@angular/cdk/collections';


declare let require: any;
// const data: any = require('src/assets/company.json');

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  rows: any[] = [];
  // columns = [{ prop: 'Task Name' }, { name: 'Date' }, { name: 'Progress' }, { name: 'Collaborator' }];
  panelOpenState = false;
  projects$: Observable<Project[]>
  tasks$: Observable<Task[]>
  sidePanelOpened = true
  formProject!: FormGroup;
  selectedProjectId: string = ""

  @ViewChild(ProjectsComponent, { static: true }) table: ProjectsComponent = Object.create(null);
  
  constructor(
    breakpointObserver: BreakpointObserver,
    public projectService: ProjectsService,
    public formBuilder: FormBuilder,
    public taskDialog: MatDialog,
  ) { 
    // this.rows = data;

    this.projects$ = projectService.getProjects()
    this.tasks$ = projectService.getTasks()
    this.formProject = this.formBuilder.group
    ({
      name: ['', Validators.required],
    });
  }

  ngOnInit(){
   console.log(this.projects$)
  }

  openAlertDialog(data: Project | Task , title: string, description: string) {
    const dialogRef = this.taskDialog.open(AlertDialogComponent, {
        data: {
          data: data,
          title: title,
          description: description
        }
    });

    dialogRef.afterClosed().subscribe(result => {
        // if (result.event === 'Add') {
        //  }
    });
  }

  openFormDialog(task?: Task) {
    const dialogRef = this.taskDialog.open(FormDialogComponent, {
        data: {
          data: task,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialog(action: string, data: Project | Task){
    switch(action){
      case "delete-project-alert":
        this.openAlertDialog(data, "Delete Project", "Do you want to delete project?")
        break;
      case "delete-task-alert":
        this.openAlertDialog(data, "Delete Task", "Do you want to delete task?")
        break;
      case "add-task-form":
        this.openFormDialog()
        break;
      default: break;
    }
  }

  addProject(projectForm: FormGroupDirective) {
    this.projectService.createProject({
        name:  this.formProject.value.name,
        completionStatus: false,
        edit: false,
        date: new Date().toLocaleString()
    })
    alert("Added Task Successfully!")
    projectForm.resetForm()
  }

  addTask(projectForm: FormGroupDirective) {
    this.projectService.createProject({
        name:  this.formProject.value.name,
        completionStatus: false,
        edit: false,
        date: new Date().toLocaleString()
    })
    alert("Added Task Successfully!")
    projectForm.resetForm()
  }

  editProject(project: Project) {
    this.projectService.updateProject(project)
    this.selectedProjectId = ""
  }

  // removeProject(project: Project) {
  //   this.projectService.deleteProject(project)
  // }

  selectProject(id: string) {
    this.selectedProjectId = id
  }

  displayedColumns = ['name', 'date', 'endDate'];
  
  dataSource = new MatTableDataSource<Task>();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
}

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches
  }


}


