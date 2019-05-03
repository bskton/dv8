import { Observable } from 'rxjs';
import { Profile } from './profile.model';

export interface ProfileService {
  getProfile(): Observable<Profile>;
  init(): void;
  update(profile: Profile): Promise<any>;
}
