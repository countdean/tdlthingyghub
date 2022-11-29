import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Project } from './models/projects.model';
import { Task } from './models/tasks.model';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  

  constructor(
    private angularFireStore: AngularFirestore,
  ) { }

  createTask(task: Task){
    this.angularFireStore.collection<Project>('tasks').add(task)
  }

  createProject(project: Project){
    this.angularFireStore.collection<Project>('project').add(project)
  }

  updateProject(project: Project){
    this.angularFireStore.collection<Project>('projects').doc(project.id).update(project)
  }

  deleteProject(project: Project){
    this.angularFireStore.collection<Project>('projects').doc(project.id).delete()
  }

  getProjects(): Observable<Project[]> {
    return this.angularFireStore.collection<Project>('projects').valueChanges({ idField: 'id' })
  }

  getTasks(): Observable<Task[]> {
    return this.angularFireStore.collection<Task>('tasks').valueChanges({ idField: 'id' })
  }

}
