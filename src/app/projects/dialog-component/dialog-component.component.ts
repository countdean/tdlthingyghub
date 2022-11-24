import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../projects.service';
import { Project } from '../projects.model';


@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.scss']
})
export class DialogComponentComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    public taskDialog: MatDialog,
    public projectService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) public projectData: any,
  ) { }

  ngOnInit(): void {
  }

  removeProject() {
    this.projectService.deleteProject(this.projectData.project)
  }

  


}
