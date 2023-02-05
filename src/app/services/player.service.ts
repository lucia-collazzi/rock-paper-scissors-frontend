import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from '../player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private _winnerSource = new Subject<string>();
  winner$ = this._winnerSource.asObservable();
  constructor(private http: HttpClient) {}

  getListPlayers(): Observable<any> {
    return this.http.get(`${environment.myApiUrl}/players`);
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${environment.myApiUrl}/players/` + id);
  }

  savePlayer(player: any): Observable<any> {
    return this.http.post(`${environment.myApiUrl}/players/`, player);
  }

  updatePlayers(id: number, player: Player): Observable<void> {
    return this.http.put<void>(`${environment.myApiUrl}/players/` + id, player);
  }

  sendWinner(message: string) {
    this._winnerSource.next(message);
  }
}
