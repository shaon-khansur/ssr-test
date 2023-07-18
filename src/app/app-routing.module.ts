import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosComponent } from './videos/videos.component';
import { VideoComponent } from './video/video.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/videos',
    pathMatch: 'full'
  },

  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'videos/:id',
    component: VideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
