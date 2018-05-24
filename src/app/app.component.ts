import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from './store/Store';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app';
  constructor (private store: Store, private server: ServerService) {
    
  }

  loadServerData() {
    this.server.load();
    //this.store.uploadData(this.server.load());
  }

  saveStateToServer() {
    this.server.save();
  }
}
