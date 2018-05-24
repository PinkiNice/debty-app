import { Component, OnInit, Input } from '@angular/core';
//import { RoomsService } from '../rooms.service';
import { Store } from '../store/Store';

import { Room } from '../shared/Room';

@Component({
  selector: '.rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  newRoomName: String = '';

  constructor(private store: Store) { 
  }

  ngOnInit() {
  }

  selectRoom(name) {
    this.store.selectRoom(name);
  }

  addRoom(name) {
    this.store.addRoom(name);
    this.store.selectRoom(name);
  }

}
