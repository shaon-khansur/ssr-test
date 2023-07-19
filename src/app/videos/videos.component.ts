import { Component, OnDestroy, OnInit, TransferState, makeStateKey } from '@angular/core';
import { ViedoService } from '../service/video-service/viedo.service';
import { Observable, Subject, debounceTime, takeUntil, tap } from 'rxjs';
import { Video } from '../models/video';
import { FormControl } from '@angular/forms';

const NODE_KEY = makeStateKey('nodekye');
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
})
export class VideosComponent implements OnInit, OnDestroy {
  allVideos$: Observable<Video[]> | undefined;
  unsubscribe$ = new Subject<boolean>();
  public inputControl = new FormControl();
  public res: any;

  constructor(private videoService: ViedoService, private state: TransferState) {}

  ngOnInit(): void {
    this.res = this.state.get(NODE_KEY, null as any);
    if (!this.res) {
      this.allVideos$ = this.videoService.videos$;
      this.videoService
        .getVideos()
        .subscribe((videos) => this.videoService.subject.next(videos));

      this.inputControl.valueChanges
        .pipe(debounceTime(500), takeUntil(this.unsubscribe$))
        .subscribe((value: string) => {
          if (value.length) {
            const videos = this.videoService.subject.getValue();
            const filteredVideos = videos.filter((video) =>
              video.title.toLowerCase().includes(value.toLowerCase())
            );
            this.videoService.subject.next(filteredVideos);
          } else {
            this.videoService
              .getVideos()
              .subscribe((videos) => this.videoService.subject.next(videos));
          }
        });

    }
  }

  ngOnDestroy(): void {
      this.unsubscribe$.next(true);
      this.unsubscribe$.complete();
  }

}
