import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  constructor(private angularFireStore: AngularFirestore) { }
  
  onAddEquipment(data: any){
    return this.angularFireStore.collection('collaborator').add(data)
  }
}

