import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  filter,
  from,
  shareReplay,
  tap,
  toArray,
} from 'rxjs';
import { Video } from 'src/app/models/video';

@Injectable({
  providedIn: 'root',
})
export class ViedoService {
  private baseURL: string =
    'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json';

  subject = new BehaviorSubject<Video[]>([]);
  videos$ = this.subject.asObservable();

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.baseURL}`);
  }

  getVideoById(id: string): Observable<Video> {
    return this.videos$.pipe(
      concatMap((videos) => from(videos)),
      filter((video) => video.id === id),
      tap((v) => console.log(v.id))
    );
  }
}
