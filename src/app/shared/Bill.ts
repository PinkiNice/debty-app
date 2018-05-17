import { Person } from './Person';

export class Bill {
  constructor (
    public owner: Person,
    public sum: Number,
    public sharers: Person[],
    public description: String,
    ) {}
}