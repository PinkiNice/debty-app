import { Injectable, OnInit } from '@angular/core';
import { RoomsService } from './rooms.service';

import { Room } from './shared/Room';
import { Person } from './shared/Person';
import { Bill } from './shared/Bill';
import { Payout } from './shared/Payout';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private roomsService: RoomsService) { 
    roomsService.activeRoomChange.subscribe(room => {
      console.log("new room selected", room.name);
    })
  }

  ngOnInit() {
    console.log("rooms service initialized");
  }

  addMember(person: Person) {
    const room = this.roomsService.getActive();
    room.members.push(person);
  }

  getMembers() : Person[] {
    return this.roomsService.getActive().members;
  }
}
