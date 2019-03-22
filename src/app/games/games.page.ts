import { Component } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalTeamsPage } from '../modal-teams/modal-teams.page';
import * as _ from 'lodash';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage {

  public phase: any;
  public gFor: any;
  public playersFor: any;

  constructor(
    private sharingService: SharingService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    this.gFor = {};
    this.playersFor = {};
    this.sharingService.currentPhase.subscribe(phase => {
      console.log(phase);
      
      this.phase = phase;
      this.phase.games.forEach(game => {
        game.forEach(team => {
          this.playersFor[team.key] = _.map(team.players, p => p);
        });
      });
      console.log(phase)
      console.log(this.playersFor)
    });
  }

  async editGame(game) {
    const modal = await this.modalCtrl.create({
      component: ModalTeamsPage,
      componentProps: { game }
    });
    return await modal.present();
  }


}
