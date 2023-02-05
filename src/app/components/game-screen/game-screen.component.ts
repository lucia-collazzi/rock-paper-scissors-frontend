import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayerService } from 'src/app/services/player.service';
import { FinalScreenComponent } from '../final-screen/final-screen.component';

@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css'],
})
export class GameScreenComponent {
  constructor(
    private _playerService: PlayerService,
    private modalService: NgbModal
  ) {}
  moves = ['Rock', 'Paper', 'Scissors'];
  roundNumber = 1;
  playerOne = { name: '', move: '', roundsWon: 0, gameWinner: false };
  playerTwo = { name: '', move: '', roundsWon: 0, gameWinner: false };
  result = '';
  playerOnesTurn = true;
  winnerIs = '';

  ngOnInit() {
    this.getPlayers();
  }
  getPlayers() {
    this._playerService.getListPlayers().subscribe((data) => {
      this.playerOne.name = data[0].name;
      this.playerTwo.name = data[1].name;
    });
  }

  submitMove(move: any) {
    if (this.playerOne.move === '') {
      this.playerOne.move = move;
      this.playerOnesTurn = false;
    } else {
      this.playerTwo.move = move;
      this.calculateRoundWinner();
      this.checkIfWinner();
      this.roundNumber = this.roundNumber + 1;
      this.playerOnesTurn = true;
      this.playerOne.move = '';
    }
  }

  playerOneWinsRound() {
    this.result = this.playerOne.name + ' wins the round!';
    this.playerOne.roundsWon = this.playerOne.roundsWon + 1;
  }
  playerTwoWinsRound() {
    this.result = this.playerTwo.name + ' wins the round!';
    this.playerTwo.roundsWon = this.playerTwo.roundsWon + 1;
  }

  calculateRoundWinner(): void {
    if (this.playerOne.move === this.playerTwo.move) {
      this.result = 'There was a tie';
    } else if (
      this.playerOne.move === 'Rock' &&
      this.playerTwo.move === 'Paper'
    ) {
      this.playerTwoWinsRound();
    } else if (
      this.playerOne.move === 'Rock' &&
      this.playerTwo.move === 'Scissors'
    ) {
      this.playerOneWinsRound();
    } else if (
      this.playerOne.move === 'Paper' &&
      this.playerTwo.move === 'Rock'
    ) {
      this.playerOneWinsRound();
    } else if (
      this.playerOne.move === 'Paper' &&
      this.playerTwo.move === 'Scissors'
    ) {
      this.playerTwoWinsRound();
    } else if (
      this.playerOne.move === 'Scissors' &&
      this.playerTwo.move === 'Rock'
    ) {
      this.playerOneWinsRound();
    } else if (
      this.playerOne.move === 'Scissors' &&
      this.playerTwo.move === 'Paper'
    ) {
      this.playerOneWinsRound();
    }
  }

  checkIfWinner() {
    if (this.playerOne.roundsWon === 3) {
      this.winnerIs = this.playerOne.name;
      this.playerOne.gameWinner = true;
      this.openModal();
      setTimeout(() => {
        this.winner();
      }, 10);
    } else if (this.playerTwo.roundsWon === 3) {
      this.winnerIs = this.playerTwo.name;
      this.playerTwo.gameWinner = true;
      this.openModal();
      setTimeout(() => {
        this.winner();
      }, 10);
    }
  }

  winner() {
    const gameWinner = this.winnerIs;
    this._playerService.sendWinner(gameWinner);
  }

  openModal() {
    this.modalService.open(FinalScreenComponent, { centered: true });
  }
}
