import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';

@Component({
  selector: 'app-loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss']
})
export class LoansListComponent implements OnInit {
  @Input() room: Room;
  @Input() activePerson: Person;

  constructor() { }

  ngOnInit() {
  }

}
