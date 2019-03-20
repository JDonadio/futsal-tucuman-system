import { Component, NgZone } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public teams: any;
  public killers: any;
  public positions: any;

  constructor(
    private sharingService: SharingService,
    private zone: NgZone,
  ) {
    this.sharingService.currentTeams.subscribe(teams => {
      this.zone.run(() => {
        this.teams = teams;
        this.positions = _.orderBy(this.teams, ['points'],['asc']);
        console.log(teams);
        console.log(this.positions)
      });
    });
  }
}
