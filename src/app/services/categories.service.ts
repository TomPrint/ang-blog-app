import { Injectable } from '@angular/core';
import {Firestore, collection,  collectionData, query} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: Firestore) { }

  getData(): Observable<Category[]> {
    const collectionInstance = collection(this.firestore, 'categories');
    const queryRef = query(collectionInstance);

    return collectionData(queryRef, { idField: 'id' }).pipe(
      map(querySnapshot => querySnapshot as Category[])
    );
  }

  
}
