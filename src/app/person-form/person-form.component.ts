import { Component, OnInit } from '@angular/core';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  newPersonName: String;
  activeRoom: Room;
  nameUnique: Boolean;

  constructor(private roomsService: RoomsService) { 
    this.newPersonName = '';
    this.activeRoom = null;
    this.nameUnique = true;

    roomsService.activeRoomChange.subscribe(activeRoom => {
      this.activeRoom = activeRoom;
    }) 
  }

  ngOnInit() {
    this.activeRoom = this.roomsService.getActive();
  }

  isNameUnique(name) {
    let unique = true;

    this.activeRoom.members.forEach(member => {
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
      this.roomsService.addPerson(new Person(this.newPersonName));
      event.currentTarget.reset();
    } else {
      this.nameUnique = false;
    }

  }
}
