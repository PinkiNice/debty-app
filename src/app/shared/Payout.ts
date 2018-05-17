import { Person } from './Person';

export class Payout {
  constructor (
      public payer: Person,
      public receiver: Person,
      public amount: Number,
    ) {}
}