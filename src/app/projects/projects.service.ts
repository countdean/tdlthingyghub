import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Project } from './projects.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private angularFireStore: AngularFirestore,
  ) { }

  createProject(project: Project){
    this.angularFireStore.collection<Project>('projects').add(project)
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

}
