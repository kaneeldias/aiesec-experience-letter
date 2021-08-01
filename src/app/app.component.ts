import { Component } from '@angular/core';

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
      ""
    ],
    pmvp: null,
    reason:null
  };

  print() {
    console.log(this.form);
  };

  addExperience() {
    this.form.positions.push({role: null, function: null, entity: null});
  }

  addConference() {
    this.form.conferences.push({role: null, name: null, year: null});
  }

  addAchievement() {
    this.form.achievements.push("");
  }

}

