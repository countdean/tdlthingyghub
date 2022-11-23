import { Component, OnInit, Inject } from '@angular/core'
import { ProjectComponent } from '../project.component'
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { TaskService } from 'src/app/Store/services/task/task.service';
import { Task, TaskDTO } from 'src/app/Model/task.model';
import { ProjectDTO, Project } from 'src/app/Model/project.model';
import { ProjectService } from 'src/app/Store/services/project/project.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  copyTasks!: Task[];
  tasks: any[] = this.ptaskService.getTask();
  formTask!: FormGroup;

  constructor(
    public ptaskService : TaskService,
    public fb: FormBuilder
  ) 
  
  { 
    this.copyTasks = this.tasks;
        this.formTask = this.fb.group({
            title: ['', Validators.required]
        });
  }

  ngOnInit() {
    this.ptaskService.onFetchTask()
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

editTask(index: number) {
  this.copyTasks[index].edit = true;
}

saveUpdatedTask(task: TaskDTO, index: number) {
  console.log(index)
  this.ptaskService.editTask(task).then(()=>{
  })
  this.copyTasks[index].edit = false;   
}


deleteTask(task: TaskDTO, index: number) {
  console.log(index);
  this.ptaskService.deleteTask(task).then(()=>{
  })
  
}


}
