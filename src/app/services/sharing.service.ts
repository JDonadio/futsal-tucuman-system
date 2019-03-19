import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  private divisions = new BehaviorSubject<any>(null);
  currentDivisions = this.divisions.asObservable();

  private teams = new BehaviorSubject<any>(null);
  currentTeams = this.teams.asObservable();

  constructor(
    private db: AngularFireDatabase,
  ) {
    var divisions = this.db.database.ref('divisions');
    divisions.on('value', (snap: any) => {
      let divisions = [];
      snap.forEach(data => { divisions.push({ key: data.key, ...data.val() }) });
      this.setDivisions(divisions);
    });
    var teams = this.db.database.ref('teams');
    teams.on('value', (snap: any) => {
      let teams = [];
      snap.forEach(data => { teams.push({ key: data.key, ...data.val() }) });
      this.setTeams(teams);
    });
  }
  
  setDivisions(divisions: any) {
    this.divisions.next(divisions);
  }
  
  setTeams(teams: any) {
    this.teams.next(teams);
  }
}
