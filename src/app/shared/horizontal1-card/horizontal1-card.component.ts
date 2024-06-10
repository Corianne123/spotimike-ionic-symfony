import { Component, Input, OnInit, inject } from '@angular/core';
import { ISong,ISongWithDetails } from 'src/app/core/interfaces/song';
import { IonLabel,IonNote,IonText,IonButton,IonButtons,IonIcon,IonItem,IonList,IonImg, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ellipsisHorizontal } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ILastPlayedWithDetails, IPlaylist } from 'src/app/core/interfaces/user';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  standalone: true,
  selector: 'app-horizontal1-card',
  templateUrl: './horizontal1-card.component.html',
  styleUrls: ['./horizontal1-card.component.scss'],
  imports : [
    IonLabel,
    IonNote,
    IonItem,
    IonList,
    IonImg, 
    IonRow, 
    IonCol, 
    IonGrid,
    IonIcon,
    IonButton,
    IonButtons,
    IonText,
    CommonModule
  ]
})
export class Horizontal1CardComponent  implements OnInit {

  @Input() lastPlayeds: ILastPlayedWithDetails[] = [];
  @Input() playlists: IPlaylist[] =[];
  private serviceFirestore = inject(FirestoreService);
  song = {} as ISongWithDetails;
  
  constructor(private router: Router ) {
    addIcons({ ellipsisHorizontal });
   }

  ngOnInit() {}

  formatDuration(seconds: number): string {
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const formattedTime = [
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');

    return formattedTime;
  }

  async  playmusic(id:string) {
    await this.serviceFirestore.getOneSong(id).then(music => {
        if(music)
          this.song = music;
      });

    const navigationExtras = {
      queryParams: {
        song: JSON.stringify(this.song)  // The object you want to send
      }
    };
    this.router.navigate(['player'], navigationExtras);
  }

   navigatetoPlaylist(id:string) {
   /* await this.serviceFirestore.getOneSong(id).then(music => {
      if(music)
        this.song = music;
    });

    const navigationExtras = {
      queryParams: {
        song: JSON.stringify(this.song)  // The object you want to send
      }
    };*/
    this.router.navigate(['music-playlist']);
  }

}