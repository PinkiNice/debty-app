import { Component, OnInit } from '@angular/core';

import { RoomsService } from '../rooms.service';

import { Room } from '../shared/Room';
import { Person } from '../shared/Person';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  room: Room = null;
  activePerson: Person = null;

  constructor(private roomsService: RoomsService) {
    roomsService.activeRoomChange.subscribe(
      activeRoom => {
        this.room = activeRoom;
      })
  }

  ngOnInit() {
    this.room = this.roomsService.getActive();
    
    if (this.room && this.room.members.length !== 0) {
      this.activePerson = this.room.members[0];
    }
    
  }

  onActivePersonChange(person) {
    this.activePerson = person;
  }
}
