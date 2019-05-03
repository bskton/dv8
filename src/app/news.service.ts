import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable()
export class NewsService {
  constructor(private firestore: AngularFirestore) {}

  init() {
    return this.firestore.collection('news').valueChanges().pipe(take(1));
  }
}
