import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';

@Component({
  selector: 'app-bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.css']
})
export class BillsListComponent implements OnInit {
  @Input() room: Room;
  @Input() activePerson: Person;
  
  constructor() { }

  ngOnInit() {
  }

}
