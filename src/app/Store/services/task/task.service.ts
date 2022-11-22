import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Task, TaskDTO, TASK_DATA } from 'src/app/Model/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  copyTasks!: Task[];
  public tasks: Task[] = TASK_DATA;
  public getTask() {
        return this.tasks;
    }

  task$ = this.getObservable(this.angularFireStore.collection('tasks')) as Observable<Task[]>;


  constructor(private angularFireStore: AngularFirestore) {}

  getObservable(collection: AngularFirestoreCollection<Task>){
    const subject = new BehaviorSubject<Task[]>([]);
    collection.valueChanges({ idField: 'id' }).subscribe((val: Task[]) => {
      subject.next(val);
    });
    return subject;
  };

  onFetchTask(){
    this.task$.subscribe((responseDTO) => {
      TASK_DATA.splice(0)
      for (var response of responseDTO) {
        TASK_DATA.push(response);
      }
      setTimeout(() => {
      }, 2000);
    })
  }

  addTask(data: any){
    return this.angularFireStore.collection('tasks').add(data)
  }

  editTask(task: TaskDTO){
    return this.angularFireStore.collection('tasks').doc(task.id).update({ ...task, edit: false });
  }

  deleteTask(task: TaskDTO){
    return this.angularFireStore.collection('tasks').doc(task.id).delete();
  }


}
