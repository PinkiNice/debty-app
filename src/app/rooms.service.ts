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
  active: Room = this.rooms[0] || null;
  activeRoomChange: Subject<Room> = new Subject<Room>();
  roomsChange: Subject<Room[]> = new Subject<Room[]>();

  constructor() { }

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

  addPerson(person: Person) {
    if (!this.active) {
      throw new Error("can't add person because room is " + this.active);
    }
    
    this.active.members.push(person);
  }

  setActive(roomName) {
    const room = this.rooms.find(room => room.name == roomName);
    
    if (room) {
      this.active = room;
      this.activeRoomChange.next(room);
    }
  }
}
