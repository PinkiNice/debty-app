import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../rooms.service';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {

  room: Room = null;
  persons: Person[] = null;

  constructor(private roomsService: RoomsService) { 
    this.roomsService.activeRoomChange.subscribe(room => {
      this.room = room;
      this.persons = room.members;
    })
  }

  ngOnInit() {
    this.room = this.roomsService.getActive();
  }

}
