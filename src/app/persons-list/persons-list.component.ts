import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { Person } from '../shared/Person';
import { Store } from '../store/Store';

@Component({
  selector: '.persons-list',
  templateUrl: './persons-list.component.html',
  styleUrls: ['./persons-list.component.scss']
})
export class PersonsListComponent implements OnInit {
  constructor(private store: Store) { 
  } 

  ngOnInit() {
  }

  setActive(person) {
    this.store.activeRoom.activePerson = person;
  }
}
