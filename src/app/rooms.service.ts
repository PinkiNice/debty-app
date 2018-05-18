import { Room } from './shared/Room';
import { Person } from './shared/Person';

import { data } from './data';
import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  rooms: Room[] = data.rooms;
  active: Room = null;
  activeRoomChange: Subject<Room> = new Subject<Room>();
  roomsChange: Subject<Room[]> = new Subject<Room[]>();

  constructor() {
    console.log('constructor is called');
    console.log(this.rooms);
    if (this.rooms.length !== 0) {
      this.setActive(this.rooms[0].name);
    }
  }

  getRooms(): Room[] {
    return this.rooms;
  }

  getActive(): Room {
    return this.active;
  }

  addRoom(room: Room) {
    this.rooms.push(room);
    this.roomsChange.next(this.rooms);
  }

  setActive(roomName) {
    const room = this.rooms.find(room => room.name == roomName);
    console.log('setting to active', roomName);
    if (room) {
      this.active = room;
      this.activeRoomChange.next(room);
    }
  }
}
