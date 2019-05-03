import { Observable } from 'rxjs';
import { Story } from './story.model';

export interface StoryService {
  init(): Observable<Story[]>;
}
