import { Observable } from 'rxjs';
import { Profile } from './profile.model';

export interface ProfileService {
  init(): Observable<Profile>;
}
