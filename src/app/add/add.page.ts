import { Component, NgZone } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage {
  public divisionForm: FormGroup;
  public teamForm: FormGroup;
  public divisions: any;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private sharingService: SharingService,
    private zone: NgZone,
  ) {
    this.divisionForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.teamForm = this.formBuilder.group({
      name: ['', Validators.required],
      division: ['', Validators.required],
    });
    this.sharingService.currentDivisions.subscribe(divisions => {
      this.zone.run(() => {
        this.divisions = divisions;
        this.teamForm.patchValue({ division: 0 });
      });
    });
  }

  addDivision() {
    console.log(this.divisionForm.value);
    let opts = {
      name: this.divisionForm.get('name').value,
    }
    this.firebaseService.createObject('divisions', opts)
      .then(() => console.log('OK'))
      .catch(err => console.log(err));
  }

  addTeam() {
    console.log(this.teamForm.value);
    let opts = {
      name: this.teamForm.get('name').value,
      division: this.teamForm.get('division').value,
    }
    this.firebaseService.createObject('teams', opts)
      .then(() => console.log('OK'))
      .catch(err => console.log(err));
  }

}
