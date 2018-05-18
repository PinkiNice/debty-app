import { Person } from './Person';
import { Bill } from './Bill';
import { Payout } from './Payout';

export class Room {
  constructor (
    public name: String,
    public members: Person[] = [],
    public bills: Bill[] = [],
    public payouts: Payout[] = [],
    ) {}
}