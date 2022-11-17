import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Project, ProjectDTO, PROJECT_DATA } from 'src/app/Model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  project$ = this.getObservable(this.angularFireStore.collection('projects')) as Observable<Project[]>;
  isEdit:boolean = false;
  toEditData!:ProjectDTO;

  constructor(
    private angularFireStore: AngularFirestore) { }
  

    getObservable(collection: AngularFirestoreCollection<Project>){
      const subject = new BehaviorSubject<Project[]>([]);
      collection.valueChanges({ idField: 'id' }).subscribe((val: Project[]) => {
        subject.next(val);
      });
      return subject;
    };


  onFetchProject(){
    this.project$.subscribe((responseDTO) => {
      console.log(responseDTO)
      PROJECT_DATA.splice(0)
      for (var response of responseDTO) {
        PROJECT_DATA.push(response);
      }
      console.log(PROJECT_DATA)
      setTimeout(() => {
        console.log(responseDTO)
        console.log(PROJECT_DATA)
      }, 2000);
    })
  }


  onAddEquipment(data: any){
    return this.angularFireStore.collection('projects').add(data)
  }
}
