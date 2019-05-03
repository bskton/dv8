import { Inject, Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
import { State } from '../app.reducer';
import { Store } from '@ngrx/store';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { concatMap, map, take } from 'rxjs/operators';
import { Profile } from './profile.model';
import * as ProfileActions from './profile.actions';
import { ProfileFormData } from './profile-form-data.model';
import * as fromApp from '../app.reducer';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileFirestoreService implements ProfileService {
  protected profileSnapshot: Profile;

  constructor(
    private state: Store<State>,
    private firestore: AngularFirestore,
    @Inject('AuthService') private auth: AuthService
  ) {
    this.state.select(fromApp.getProfile)
      .subscribe((p: Profile) => {
        this.profileSnapshot = p;
      });
  }

  getProfile(): Observable<Profile> {
    return this.state.select(fromApp.getProfile);
  }

  init(): void {
    this.auth.getUser().pipe(
      concatMap(user => this.firestore
        .collection<Profile>('profiles', ref => ref.where('userUid', '==', user.uid))
        .snapshotChanges()),
      map(profiles => profiles.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })[0]),
      take(1),
    ).subscribe((profile: Profile) => {
      this.state.dispatch(new ProfileActions.FetchFromBackend(profile));
    });
  }

  update(p: ProfileFormData): Promise<any> {
    const profile: Profile = {
      ...this.profileSnapshot,
      firstName: p.firstName,
      lastName: p.lastName
    };
    this.state.dispatch(new ProfileActions.Update(profile));

    return this.firestore.doc<Profile>(`profiles/${this.profileSnapshot.id}`).update(profile);
  }
}
