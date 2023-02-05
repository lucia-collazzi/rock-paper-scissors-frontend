import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { FinalScreenComponent } from './components/final-screen/final-screen.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: StartScreenComponent },
  { path: 'game', component: GameScreenComponent },
  { path: 'winner', component: FinalScreenComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  StartScreenComponent,
  GameScreenComponent,
  FinalScreenComponent,
  PageNotFoundComponent,
];
