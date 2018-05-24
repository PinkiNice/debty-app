import { Injectable } from '@angular/core';
import { Store } from './store/Store';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  state = [
    {
      name: "School",
      members: [{ name: 'Gosha' }, { name: 'Vova' }, { name: 'Semen' }],
      bills: [
        {
          owner: { name: 'Gosha' },
          sharers: [
            { name: 'Gosha' },
            { name: 'Vova' }
          ],
          description: 'Just a test bill',
          total: '100',
        }
      ]
    }
  ];

  constructor(private store: Store) { }

  save() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.state = JSON.parse(JSON.stringify(this.store.rooms));

        //this.store.uploadData(JSON.parse(JSON.stringify(this.store.rooms)));
        resolve('State saved to the server');
      }, 800);
    });
  }

  load() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.store.uploadData(this.state);
        
        resolve(this.state)
      }, 1000);
    })
  }

  auth() {

  }

}
