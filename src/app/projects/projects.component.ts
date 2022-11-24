import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Project } from './projects.model';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { DialogComponent } from '../material-component/dialog/dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';

declare let require: any;
const data: any = require('src/assets/company.json');

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  rows: any[] = [];
  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];
  panelOpenState = false;
  projects$: Observable<Project[]>
  sidePanelOpened = true
  formProject!: FormGroup;
  selectedProjectId: string = ""

  @ViewChild(ProjectsComponent, { static: true }) table: ProjectsComponent = Object.create(null);
  constructor(
    public projectService: ProjectsService,
    public formBuilder: FormBuilder,
    public taskDialog: MatDialog,
  ) { 
    this.rows = data;
    this.projects$ = projectService.getProjects()
    this.formProject = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log(this.rows)
  }

  openDialog(action: string, project: Project) {
    action = action;
    const dialogRef = this.taskDialog.open(DialogComponentComponent, {
        data: {project: project}
    });

    dialogRef.afterClosed().subscribe(result => {
        // if (result.event === 'Add') {
        //  }
    });
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

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches
  }

}


