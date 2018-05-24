import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';
import { Store } from '../store/Store';

@Component({
  selector: '.bills-list',
  templateUrl: './bills-list.component.html',
  styleUrls: ['./bills-list.component.scss']
})
export class BillsListComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit() {
  }

  deleteBill(bill) {
    this.store.activeRoom.removeBill(bill);
    console.log("delete", bill);
  }
}
