import { Component, OnInit } from '@angular/core';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {
  newPersonName: String;
  activeRoom: Room;
  nameUnique: Boolean;

  constructor(private roomService: RoomService) { 
    this.newPersonName = '';
    this.activeRoom = null;
    this.nameUnique = true;

    /*roomsService.activeRoomChange.subscribe(activeRoom => {
      this.activeRoom = activeRoom;
    }) */
  }

  ngOnInit() {
    //this.activeRoom = this.roomsService.getActive();
  }

  isNameUnique(name) {
    let unique = true;

    this.roomService.getMembers().forEach(member => {
      if (member.name == name) {
        unique = false;
      }
    })

    return unique;
  }

  addNewPerson(event) {
    event.preventDefault();
    console.log("add new member", this.newPersonName);

    if (this.isNameUnique(this.newPersonName)) {
      this.nameUnique = true;

      this.roomService.addMember(new Person(this.newPersonName));
    } else {
      this.nameUnique = false;
    }

  }
}
