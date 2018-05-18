import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../shared/Person';
import { RoomsService } from '../rooms.service';

@Component({
  selector: 'app-persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent implements OnInit {
  @Output() activePersonChange = new EventEmitter<Person>();
  @Input() persons: Person[];

  selected: Person;

  constructor(private roomsService: RoomsService) { 
    roomsService.activeRoomChange.subscribe(room => {
      if (room.members.length !== 0) {
        this.setActive(room.members[0]);
      } else {
        this.setActive(null);
      }
    })
  } 

  ngOnInit() {
    if (this.persons.length !== 0) {
      this.selected = this.persons[0];
      this.activePersonChange.emit(this.selected);
    }
  }

  setActive(person) {
    this.selected = person;
    this.activePersonChange.emit(this.selected);
  }
}
