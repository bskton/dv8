import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { concatMap, take, tap } from 'rxjs/operators';

import * as StoryActions from './story.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { StoryService } from './story.service';
import { Story } from './story.model';
import { State } from '../app.reducer';

@Injectable()
export class StoryNgrxService implements StoryService {
  constructor(
    private store: Store<State>,
    private firestore: AngularFirestore,
    @Inject('AuthService') private auth: AuthService) {}

  init(): Observable<Story[]> {
    return this.auth.getUser().pipe(
      concatMap(user => {
        return this.firestore.
          collection<Story>('stories',
            ref => ref.where('author', '==', user.uid))
          .valueChanges();
      }),
      tap((stories: Story[]) => {
        this.store.dispatch(new StoryActions.FetchFromBackend(stories));
      }),
      take(1)
    );
  }
}
