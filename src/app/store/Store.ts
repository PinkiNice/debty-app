import { Injectable, OnInit } from '@angular/core';
import { observable, action } from 'mobx-angular';

import { data } from '../data';

import { Room } from '../shared/Room';
import { Person } from '../shared/Person';
import { Bill } from '../shared/Bill';

@Injectable({
  providedIn: 'root'
})
export class Store {
  @observable rooms: Room[] = data.rooms;
  @observable activeRoom: Room = data.rooms[0] ? data.rooms[0] : null;

  @action addRoom(name) {
    if (this.rooms.find(room => room.name == name)) {
      throw Error("Duplicate room name");
    }

    this.rooms.push(new Room(name));
  }

  @action selectRoom(name) {
    const room = this.rooms.find(room => room.name == name);

    if (room) {
      this.activeRoom = room;
    } else {
      throw new Error(`Room '${name}' not found in store`)
    }
  }

  @action uploadData(data) {
    const rooms = [];
    
    data.forEach(room => {
      const members = room.members.map(person => new Person(person.name));

      rooms.push(new Room(
        room.name,
        members,
        room.bills.map(bill => 
           new Bill(
             members.find(member => member.name == bill.owner.name),
             bill.total,
             bill.sharers.map(sharer => members.find(member => member.name == sharer.name)),
             bill.description
             )
           ),

      ));
    });

    this.rooms = rooms;
    this.activeRoom = this.rooms[0] || null;
  }
}