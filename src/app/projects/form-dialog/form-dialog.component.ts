import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/projects.model';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from '../projects.service';
import { ProjectsComponent } from '../projects.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

  formTask!: FormGroup;
  tasks$: Observable<Project[]>

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
              public formBuilder: FormBuilder,
              public taskDialog: MatDialog,
              public projectService: ProjectsService,
              
              ) { 
                this.tasks$ = projectService.getProjects()
                this.formTask = this.formBuilder.group({
                  name: ['', Validators.required],
                  endDate: ['', Validators.required] 
                });
              }

              date = new FormControl(new Date());

  ngOnInit(): void {
  }

  // addTask(tasksForm: FormGroupDirective) {
  //   this.taskService.createTask({
  //       name:  this.formTask.value.name,
  //       completionStatus: false,
  //       edit: false,
  //       date: new Date().toLocaleString(),
  //       endDate: this.formTask.value.endDate
  //   })
  //   alert("Added Task Successfully!")
  //   tasksForm.resetForm()
  // }

  addTaskByUpdateProject(){
    const project = this.dialogData;
    const tasks = project.project.tasks == null?[]:project.project.tasks
    let task = {
      name:  this.formTask.value.name,
      completionStatus: false,
      edit: false,
      date: new Date().toLocaleString(),
      // endDate: this.formTask.value.endDate
      endDate: this.formTask.value.endDate
    }
    
    console.log("asdffffffffffff", project)
    console.log("~~~~~~~~~~~~~~~~~", [])
    // console.log("yyyyyyyyyyyyyyyyy", project.id)
    this.projectService.updateTask([...tasks, task], project.project.id!)
  }


}

