import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  entities = ["Colombo Central", "Colombo North", "Colombo South", "Kandy", "USJ", "NSBM", "Ruhuna", "SLIIT"];

  form = {
    name: null,
    email: null,
    contact: null,
    entity: null,
    full_member: false,
    joined: null,
    exit: null,
    positions: [
      {role: null, function: null, entity: null}
    ],
    conferences: [
      {role: null, name: null, year: null}
    ],
    achievements: [
      {title: null, entity: null, term: null}
    ],
    pmvp: null,
    reason:null
  };


  loading = false;

  constructor(private store: AngularFirestore, private _snackBar: MatSnackBar) {}

  submit() {
    if (!this.validateForm()) return;
    this.loading = true;
    this.store.collection('requests').doc(new Date().toISOString() + this.form.email!)
      .set(this.form).then(r => {
      this.loading = false;
      this.openSnackBar("Your request has been submitted", "Dismiss");
    }, e => {
      this.loading = false;
      this.openSnackBar("An error occurred." + e, "Dismiss");
    });
  };

  validateForm() {
    let flag = true;
    return flag;

    //Validate name
    if (this.form.name == null || this.form.name == "") {
      flag = false;
    }

    return flag;
  }

  addExperience() {
    this.form.positions.push({role: null, function: null, entity: null});
  }

  addConference() {
    this.form.conferences.push({role: null, name: null, year: null});
  }

  addAchievement() {
    this.form.achievements.push({title: null, entity: null, term: null});
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}

