import { Component, NgZone } from '@angular/core';
import { SharingService } from '../services/sharing.service';
import { Router } from '@angular/router';
import * as robin from 'roundrobin';
import * as _ from 'lodash';
import { FirebaseService } from '../services/firebase.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage {
  public calendar: any;
  public teams: any;
  public calendarModified: boolean;

  constructor(
    private zone: NgZone,
    private sharingService: SharingService,
    private router: Router,
    private firebaseService: FirebaseService,
    private messagesService: MessagesService,
  ) {
    this.calendar = [];
    this.calendarModified = false;
    this.sharingService.currentTeams.subscribe(teams => {
      this.zone.run(() => { this.teams = teams });
    });
    this.sharingService.currentCalendar.subscribe(calendar => {
      this.zone.run(() => { this.calendar = calendar });
    });
  }
  
  generateCalendar() {
    if (!this.teams) return;
    this.calendarModified = true;
    this.calendar = robin(this.teams.length, _.shuffle(this.teams));
  }

  async saveCalendar() {
    const resp = await this.messagesService.showConfirm({ 
      title: 'Pedido de confirmación', 
      msg: 'Si los cambios se confirman, todas las estadíasticas previas se perderán. ¿Desea continuar?',
      okText: 'Si, continuar'
    });
    if (!resp) return;
    this.messagesService.showLoading({ msg: 'Guardando programación...' });
    this.firebaseService.replaceObject('calendar/', this.calendar)
      .then(() => {
        this.onSuccess({ msg: 'Programación guardada correctamente!' });
      })
      .catch(err => {
        this.onError({ msg: 'Ha ocurrido un error. ', err });
      });
  }

  openPhase(phase: any, index) {
    if (this.calendarModified) return;
    const opts = { games: phase, index };
    this.sharingService.setPhase(opts);
    this.router.navigate(['/games']);
  }

  private onSuccess(opts: any) {
    setTimeout(() => {
      this.calendarModified = false;
      this.messagesService.dismissLoading();
      this.messagesService.showToast({ msg: opts.msg });
    }, 900);
  }

  private onError(opts: any) {
    this.messagesService.dismissLoading();
    this.messagesService.showToast({ msg: opts.msg + opts.err });
  }
}
