import { Component, OnInit, Input } from '@angular/core';
import { RoomsService } from '../rooms.service';
import { Room } from '../shared/Room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {

  rooms: Room[];
  activeRoom: Room;
  newRoomName: String = '';

  constructor(private roomsService: RoomsService) { 
    this.rooms = [];

    roomsService.roomsChange.subscribe(room => {
      this.rooms = roomsService.getRooms();
    });

    roomsService.activeRoomChange.subscribe(activeRoom => {
      this.activeRoom = activeRoom;
    });
  }

  ngOnInit() {
    this.rooms = this.roomsService.getRooms();
    this.activeRoom = this.roomsService.getActive();
  }

  onRoomClick(room) {
    this.roomsService.setActive(room.name);
  }

  addRoom(name) {
    const room = new Room(name);
    this.roomsService.addRoom(room);
    this.roomsService.setActive(room.name);
  }

}
