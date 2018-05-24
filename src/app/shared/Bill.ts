import { Person } from './Person';

export class Bill {
  constructor (
    public owner: Person,
    public total: number,
    public sharers: Person[],
    public description: string,
    ) {}
}