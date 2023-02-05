import { Component } from '@angular/core';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-final-screen',
  templateUrl: './final-screen.component.html',
  styleUrls: ['./final-screen.component.css'],
})
export class FinalScreenComponent {
  constructor(private _platerService: PlayerService) {}
  winner = '';

  ngOnInit() {
    this._platerService.winner$.subscribe((message) => {
      this.winner = message;
    });
  }
}
