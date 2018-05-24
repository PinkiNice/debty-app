import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../shared/Room';
import { Person } from '../shared/Person';
import { Store } from '../store/Store';
import { Bill } from '../shared/Bill';
import { observe } from 'mobx';

@Component({
  selector: '.bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.scss']
})
export class BillFormComponent implements OnInit {
  selected = {};
  billDescription: string = '';
  billTotal: number = 0;


  constructor(private store: Store) { 
  }

  initSelected(possibleMembers) {

    this.selected = {};
    possibleMembers.forEach(member => {
      this.selected[member.name] = true;
    });
  }

  ngOnInit() {
    this.initSelected(Array.from(this.store.activeRoom.members));

    observe(this.store, (value) => {
      if (value.object.activeRoom) {
        this.initSelected(value.object.activeRoom.members);
      }
    });
  }

  togglePerson(person) {
    this.selected[person.name] = !this.selected[person.name];
  }

  toggleAll() {
    const keys = Object.keys(this.selected);
    const value = !this.isAllSelected();

    keys.forEach(key => {
      this.selected[key] = value;
    })
  }

  isAllSelected() {
    let isAllSelected = true;
    const keys = Object.keys(this.selected);
    keys.forEach(key => {
      if (this.selected[key] !== true) {
        isAllSelected = false;
      }
    })

    return isAllSelected;
  }

  get selectedCount() {
    return Object.keys(this.selected).reduce((acc, key) => {
      if (this.selected[key]) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0)
  }

  selectedPersons() : Person[] {
    const persons: Person[] = [];

    Object.keys(this.selected).forEach(key => {
      //console.log(key);
      if (this.selected[key]) {
        //console.log(this.selected[key]);
        //console.log(this.store.activeRoom.members);
        //console.log(this.store.activeRoom.members.find(member => member.name == key));
        persons.push(this.store.activeRoom.members.find(member => member.name == key));
      }
    })

    return persons;
  }

  addBill(event) {
    event.preventDefault();

    if (this.selectedCount == 0) {
      event.preventDefault();
    } else {
      this.store.activeRoom.addBill(new Bill(
        this.store.activeRoom.activePerson,
        this.billTotal,
        this.selectedPersons(),
        this.billDescription
      ));
      event.currentTarget.reset();
    }

  }
}
