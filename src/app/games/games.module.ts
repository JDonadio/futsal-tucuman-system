import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GamesPage } from './games.page';
import { ModalTeamsPageModule } from '../modal-teams/modal-teams.module';

const routes: Routes = [
  {
    path: '',
    component: GamesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ModalTeamsPageModule,
  ],
  declarations: [GamesPage]
})
export class GamesPageModule {}
