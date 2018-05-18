import { Component, OnInit, Input } from '@angular/core';
import { RoomsService } from '../rooms.service';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss']
})
export class BillFormComponent implements OnInit {
  @Input() room: Room;
  @Input() activePerson: Person;
  //availablePersons: Person[] = null;
  selectedPersons = [];

  constructor(private roomsService: RoomsService) { 
    this.roomsService.activeRoomChange.subscribe(room => {
      this.selectedPersons = Array.from(room.members);    
    })
  }

  ngOnInit() {
    this.selectedPersons = Array.from(this.room.members);
    //this.room = this.roomsService.getActive();
    //this.availablePersons = this.room.members;
  }

  togglePerson(person) {
    if (this.selectedPersons.indexOf(person) !== -1) {
      this.selectedPersons.splice(this.selectedPersons.indexOf(person), 1);
    } else {
      this.selectedPersons.push(person);
    }
    console.log(this.selectedPersons);
  }
}
