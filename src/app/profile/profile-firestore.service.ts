import { Inject, Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { State } from '../app.reducer';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { concatMap, map, take, tap } from 'rxjs/operators';
import { Profile } from './profile.model';
import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileFirestoreService implements ProfileService {
  constructor(
    private state: Store<State>,
    private firestore: AngularFirestore,
    @Inject('AuthService') private auth: AuthService
  ) {}

  init() {
    return this.auth.getUser().pipe(
      concatMap(user => this.firestore
        .collection<Profile>('profiles', ref => ref.where('userUid', '==', user.uid))
        .valueChanges()),
      map((profiles: Profile[]) => profiles[0]),
      tap((profile: Profile) => {
        this.state.dispatch(new ProfileActions.FetchFromBackend(profile));
      }),
      take(1)
    );
  }
}
