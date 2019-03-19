import { Component, NgZone } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import * as _ from 'lodash';
import * as robin from 'roundrobin';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage {
  public calendar: any;
  public teams: any;
  private teamFor: any;

  constructor(
    private sharingService: SharingService,
    private zone: NgZone,
  ) {
    this.sharingService.currentTeams.subscribe(teams => {
      this.zone.run(() => {
        if (!teams) return;
        this.teams = teams;
        this.teamFor = _.groupBy(teams, 'key');
        console.log(this.teamFor);
        this.calendar = robin(teams.length, teams);
        console.log(this.calendar);
      });
    });
  }
}
