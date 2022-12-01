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
  selectedTaskId: string = ""

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
   console.log()
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

  openFormDialog(project: Project) {
    console.log("asdfgdsfgsdfgsdfdfgg", project)
    const dialogRef = this.taskDialog.open(FormDialogComponent, {
        data: {
          project: project,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialog(action: string, project: Project | Task){
    switch(action){
      case "delete-project-alert":
        this.openAlertDialog(project, "Delete Project", "Do you want to delete project?")
        break;
      case "delete-task-alert":
        this.openAlertDialog(project, "Delete Task", "Do you want to delete task?")
        break;
      case "add-task-form":
        this.openFormDialog(project)
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

  addTask(taskForm: FormGroupDirective) {
    this.projectService.createProject({
        name:  this.formProject.value.name,
        completionStatus: false,
        edit: false,
        date: new Date().toLocaleString()
    })
    alert("Added Task Successfully!")
    taskForm.resetForm()
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

  displayedColumns = ['taskName', 'date', 'endDate'];
  dataSource = new MatTableDataSource<Task>();

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    // this.dataSource.filter = filterValue;
}

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches
  }


}


