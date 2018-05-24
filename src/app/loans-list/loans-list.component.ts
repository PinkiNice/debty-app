import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';
import { Store } from '../store/Store';

@Component({
  selector: '.loans-list',
  templateUrl: './loans-list.component.html',
  styleUrls: ['./loans-list.component.scss']
})
export class LoansListComponent implements OnInit {

  constructor(private store: Store) {

  }
  
  ngOnInit() {
    
  }

}
