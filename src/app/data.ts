import { Room } from './shared/Room';
import { Bill } from './shared/Bill';
import { Person } from './shared/Person';
import { Payout } from './shared/Payout';

export const data = {
  rooms: <Room[]> [
    new Room(
      'Квартира',
      [new Person('Костя'), new Person('Тема'), new Person('Гоша')],
      [],
      [],
    ),
    new Room('Шашлыки'),
  ]
}