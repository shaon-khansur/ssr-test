import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ViedoService } from '../service/video-service/viedo.service';
import { Video } from '../models/video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  videoSubject = new BehaviorSubject<Video>({} as Video);
  video$: Observable<Video> | undefined = this.videoSubject.asObservable();
  videos$: Observable<Video[]> | undefined;

  constructor(
    private route: ActivatedRoute,
    private videoService: ViedoService
  ) {}

  ngOnInit(): void {
    this.videos$ = this.videoService.videos$;
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.videoService.getVideoById(id).subscribe((video) => {
        this.videoSubject.next(video);
      });
    });
  }
}
