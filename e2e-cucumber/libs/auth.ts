import * as firebase from 'firebase';
import { environment } from '../environments/environment';

export class Auth {
  init() {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebase);
    }
  }

  createUser(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }

  removeUser(email: string, password: string): Promise<void> {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential: firebase.auth.UserCredential) =>
        userCredential.user.delete()
      );
  }
}
