import { Observable } from 'rxjs';
import { Profile } from './profile.model';

export interface ProfileService {
  getLoadingState(): Observable<boolean>;
  getProfile(): Observable<Profile>;
  init(): void;
  update(profile: Profile): Promise<any>;
}
