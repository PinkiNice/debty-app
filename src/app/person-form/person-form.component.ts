import { Component, OnInit } from '@angular/core';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';
import { Store } from '../store/Store';

@Component({
  selector: '.person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  newPersonName: string;
  nameUnique: boolean;

  constructor(private store: Store) { 
    this.newPersonName = '';
    this.nameUnique = true;
  }

  ngOnInit() {
  }

  isNameUnique(name) {
    let unique = true;

    this.store.activeRoom.members.forEach(member => {
      if (member.name == name) {
        unique = false;
      }
    })

    return unique;
  }

  addNewPerson(event) {
    event.preventDefault();

    if (this.isNameUnique(this.newPersonName)) {
      this.nameUnique = true;
      this.store.activeRoom.addMember(new Person(this.newPersonName));
      event.currentTarget.reset();
      
    } else {
      this.nameUnique = false;
    }

  }
}
