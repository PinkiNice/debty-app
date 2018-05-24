import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Bill } from '../shared/Bill';

@Component({
  selector: '.bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  @Input() bill: Bill;
  @Output() billDeletion = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get names() {
    return this.bill.sharers.map(person => person.name).join(' ');
  }

  delete() {
    this.billDeletion.emit(null);
  }
}
