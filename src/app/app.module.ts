import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
/* Services */

/* Components */
import { AppComponent } from './app.component';
import { PersonsListComponent } from './persons-list/persons-list.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomComponent } from './room/room.component';
import { PersonComponent } from './person/person.component';
import { LoansListComponent } from './loans-list/loans-list.component';
import { BillComponent } from './bill/bill.component';
import { BillsListComponent } from './bills-list/bills-list.component';
import { BillFormComponent } from './bill-form/bill-form.component';
import { PersonFormComponent } from './person-form/person-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonsListComponent,
    RoomsListComponent,
    RoomComponent,
    PersonComponent,
    LoansListComponent,
    BillComponent,
    BillsListComponent,
    BillFormComponent,
    PersonFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
