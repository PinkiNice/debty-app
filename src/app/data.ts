import { Room } from './shared/Room';
import { Bill } from './shared/Bill';
import { Person } from './shared/Person';
import { Payout } from './shared/Payout';

const konst = new Person('Костя');
const tema = new Person('Артем');
const gosha = new Person('Гошан');

export const data = {
  rooms: <Room[]> [
    new Room(
      'Квартира',
      [konst, tema, gosha],
      [new Bill(konst, 110, [tema, gosha], 'Кофе и чай'), new Bill(tema, 233, [tema, konst, gosha], 'Поход в ресторан')]
    ),
    new Room('Шашлыки'),
  ]
}