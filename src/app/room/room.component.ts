import { Component, OnInit } from '@angular/core';

import { Room } from '../shared/Room';
import { Person } from '../shared/Person';
import { Store } from '../store/Store';

@Component({
  selector: '.room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  changeActivePerson(person) {
    this.store.activeRoom.activePerson = person;
  }
}
