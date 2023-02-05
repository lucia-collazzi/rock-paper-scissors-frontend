import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Player } from 'src/app/player';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css'],
})
export class StartScreenComponent {
  playersList: any[] = [];
  namesForm: FormArray;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _playerService: PlayerService
  ) {
    this.namesForm = this.fb.array([
      Validators.maxLength(15),
      Validators.maxLength(15),
    ]);
  }

  ngOnInit() {
    this.getPlayers();
  }

  get names() {
    return this.namesForm.controls;
  }

  getPlayers() {
    this._playerService.getListPlayers().subscribe(
      (data) => {
        this.names[0].setValue(data[0].name);
        this.names[1].setValue(data[1].name);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updatePlayers() {
    this._playerService.getPlayer(1).subscribe((data) => {
      const player: Player = {
        id: 1,
        name: this.names[0].value,
      };
      this._playerService.updatePlayers(data.id, player).subscribe();
    });
    this._playerService.getPlayer(2).subscribe((data) => {
      const player: Player = {
        id: 2,
        name: this.names[1].value,
      };
      this._playerService.updatePlayers(data.id, player).subscribe();
    });
  }

  redirect() {
    this.router.navigate(['/game']);
  }

  onSubmit() {
    this.updatePlayers();
    setTimeout(() => {
      this.redirect();
    }, 500);
  }
}
