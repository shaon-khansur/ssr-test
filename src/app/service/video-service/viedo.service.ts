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
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ViedoService {
  subject = new BehaviorSubject<Video[]>([]);
  videos$ = this.subject.asObservable();

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${environment.baseURL}`);
  }

  getVideoById(id: string): Observable<Video> {
    return this.videos$.pipe(
      concatMap((videos) => from(videos)),
      filter((video) => video.id === id),
      tap((v) => console.log(v.id))
    );
  }
}
