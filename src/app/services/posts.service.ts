import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where, limit, orderBy, doc, docData, updateDoc, getDoc } from '@angular/fire/firestore'; // Import 'limit' from firestore
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  latestPost: any;

  constructor(private firestore: Firestore) { }

  getFeatured(): Observable<Post[]> {
    const collectionInstance = collection(this.firestore, 'posts');
    const queryRef = query(
      collectionInstance,
      where('isFeatured', '==', true),
      limit(4)
      // limits featured posts only to 4x
    );

    return collectionData(queryRef, { idField: 'id' }).pipe(
      map(querySnapshot => querySnapshot as Post[])
    );
  }

  loadLatest(): Observable<Post[]> {
    const collectionInstance = collection(this.firestore, 'posts');
    const queryRef = query(
      collectionInstance,
     orderBy('createdAt'));

    return collectionData(queryRef, { idField: 'id' }).pipe(
      map(querySnapshot => querySnapshot as Post[])
    );
  }

  loadCategoryPost(categoryId: string): Observable<Post[]> {
    const collectionInstance = collection(this.firestore, 'posts');
    const queryRef = query(
      collectionInstance,
      where('category.categoryId', '==', categoryId),
      limit(4)
    );
  
    return collectionData(queryRef, { idField: 'id' }).pipe(
      map(querySnapshot => querySnapshot as Post[])
    );
  }

  loadOnePost(postId: string): Observable<Post> {
    const docRef = doc(this.firestore, `posts/${postId}`);
    return docData(docRef).pipe(
      map((post: any) => {
        if (post) {
          return { ...post, id: postId };
        } else {
          return console.error("Erorr - id does not exist");
          ; 
        }
      })
    );
  }

  loadSimilar(catId: string): Observable<Post[]> {
    const collectionInstance = collection(this.firestore, 'posts');
    const queryRef = query(
      collectionInstance,
      where('category.categoryId', '==', catId),
      limit(4)
    );
  
    return collectionData(queryRef, { idField: 'id' }).pipe(
      map(querySnapshot => querySnapshot as Post[])
    );
  }

  countViews(postId: string) {
    const docRef = doc(this.firestore, `posts/${postId}`);
    return getDoc(docRef).then(doc => {
      const views = doc.get('views');
      if (views) {
        return updateDoc(docRef, {
          views: views + 1
        });
      } else {
        return updateDoc(docRef, {
          views: 1
        });
      }
    }).then(() => {
      console.log('Views added');
    });
  }
}


