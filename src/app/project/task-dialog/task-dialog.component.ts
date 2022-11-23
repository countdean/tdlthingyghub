import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskComponent } from '../task/task.component';
import { ProjectComponent } from '../project.component';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { Task } from 'src/app/Model/task.model';
import { TaskService } from 'src/app/Store/services/task/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  action!: string;
  formTask!: FormGroup;
  copyTasks!: Task[];
  tasks: any[] = this.ptaskService.getTask();

  constructor(
    private ptaskService: TaskService,
    //@Inject(MAT_DIALOG_DATA) public addData: any,
    //@Inject(TaskComponent) public addData: any,
    public formBuilder: FormBuilder,
    
    )
   {
    this.copyTasks = this.tasks;
        this.formTask = this.formBuilder.group({
            title: ['', Validators.required]
        });
    }

  ngOnInit() {
  }

  allTasks(): void {
    this.tasks.forEach(task => task.completionStatus = (
        <HTMLInputElement>event!.target).checked);
  }

  taskremainingList(): number {
    return this.tasks.filter(task => !task.completionStatus).length;
  }

  addTask(taskForm: FormGroupDirective) {
    this.ptaskService.addTask({
        message:  this.formTask.value.title,
        completionStatus: false,
        edit: false,
        date: new Date().toLocaleString()
    })
    taskForm.resetForm()
  }

}
