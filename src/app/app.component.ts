import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  entities = ["Colombo Central", "Colombo North", "Colombo South", "Kandy", "USJ", "Ruhuna", "SLIIT"];

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

  constructor(private store: AngularFirestore) {}

  submit() {
    if (!this.validateForm()) return;
    this.store.collection('requests').add(this.form).then(r => {
      console.log("added");
    });
  };

  validateForm() {
    let flag = true;

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

}

