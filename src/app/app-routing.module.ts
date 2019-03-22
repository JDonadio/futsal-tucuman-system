import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'add', loadChildren: './add/add.module#AddPageModule' },
  { path: 'calendar', loadChildren: './calendar/calendar.module#CalendarPageModule' },
  { path: 'games', loadChildren: './games/games.module#GamesPageModule' },
  { path: 'modal-teams', loadChildren: './modal-teams/modal-teams.module#ModalTeamsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
