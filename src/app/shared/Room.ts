import { observable, action, computed } from 'mobx';
import { Person } from './Person';
import { Bill } from './Bill';
import { Payout } from './Payout';

export class Room {
  private accuracyRounding = 0;

  @observable activePerson: Person;
  @observable members: Person[];

  @observable bills: Bill[];
  @observable payouts: Payout[];
  @observable name: String;

  @observable loans: {};

  constructor(
    name: string,
    members: Person[] = [],
    bills: Bill[] = [],
    payouts: Payout[] = [],
  ) {
    this.name = name;
    this.members = members;
    this.bills = bills;
    this.activePerson = members[0];

    this.recountLoans();
  }

  @action addMember(person: Person) {
    if (this.members.find(member => member.name == person.name)) {
      throw new Error("Duplicate room members names");
    }
    
    this.members.push(person);

    this.recountLoans();
  }

  @action changeActivePerson(person: Person) {
    this.activePerson = person;
  }

  @action addBill(bill: Bill) {
    this.bills.push(bill);
    this.accountBill(bill);
  }

  @action removeBill(bill: Bill) {
    this.bills.splice(this.bills.indexOf(bill), 1);
    
    this.recountLoans();
  }

  @action addPayout(payout: Payout) {
    this.payouts.push(payout);
  }

  @computed get personShouldReturn() {
    const debts = [];

    this.members.forEach(member => {
      const shouldReturnToMember = this.loans[member.name][this.activePerson.name];

      if (shouldReturnToMember !== 0) {
        debts.push({ person: member, sum: shouldReturnToMember });
        //debts[member.name] = shouldReturnToMember;
      }
    })

    return debts;
  }

  @computed get personShouldBeReturned() {
    const debts = [];

    this.members.forEach(member => {
      const memberShouldReturn = this.loans[this.activePerson.name][member.name];

      if (memberShouldReturn !== 0) {
        debts.push({ person: member, sum: memberShouldReturn });
        //debts[member.name] = memberShouldReturn;
      }
    });

    return debts;
  }

  @computed get totalDebt() {
    return this.personShouldReturn.reduce((acc, { sum }) => acc + sum, 0);
  }

  @computed get totalLoan() {
    return this.personShouldBeReturned.reduce((acc, { sum }) => acc + sum, 0);
  }

  handleCircularLoans(bill: Bill) {
    const sharers = Array.from(bill.sharers);
    const owner = bill.owner;

    if (sharers.indexOf(owner) !== 0) {
      // Remove owner of the bill from sharers list
      // Because we dont want to find circulars for himself (as there is already a circular - to himself)
      sharers.splice(sharers.indexOf(owner), 1);
    }

    sharers.forEach(sharer => {
      // Найти всех кому должен owner
        // Среди них найти тех кто должен текущему sharer'у 
          // Вычесть у всех из цепочки минимальный размер долга
        // Если у sharera еще остался долг owner'у
          // Для каждого, кому должен owner
            // Найти всех кому должен дол
      //

      // Список тех, кому должен owner
      const ownerCreditors = this.members.filter(member => {
        // Если тот кто платил за чек должен что-то этому memberу
        if (this.loans[member.name][owner.name]) {
          return true;
        }
        // Иначе пропускаем 
        return false;
      });

      ownerCreditors.forEach(creditor => {
        // Если он что-то должен тому, кто был в чеке
        if (this.loans[sharer.name][creditor.name]) {

          // Найдем минимальное звено в цепочке
          const minValueInAChain = Math.min(
            this.loans[sharer.name][creditor.name],
            this.loans[creditor.name][owner.name],
            this.loans[owner.name][sharer.name],
          );


        }
      })
    })

  }

  accountBill(bill: Bill) {
    const { owner, sharers, total } = bill;
    const sharerShouldReturn: number = Math.ceil(total / sharers.length);

    sharers.forEach(sharer => {
      if (sharer == owner) {
        // Don't pollute loans object with nonsense debts
        return;
      }

      const ownerMustReturnToSharer = Math.ceil(this.loans[sharer.name][owner.name]);

      if (ownerMustReturnToSharer == 0) {
        this.loans[owner.name][sharer.name] += sharerShouldReturn;
      } else if (ownerMustReturnToSharer >= sharerShouldReturn) {
        this.loans[sharer.name][owner.name] -= sharerShouldReturn;
      } else {
        this.loans[sharer.name][owner.name] = 0;
        this.loans[owner.name][sharer.name] += sharerShouldReturn - ownerMustReturnToSharer;
        
      }

    });

    //this.handleCircularLoans(bill);
  }

  initializeLoans() {
    this.loans = {};
    this.members.forEach(owner => {
      const personLoans = {};

      this.members.forEach(borrower => {
        personLoans[borrower.name] = /* this.loans[owner.name][borrower.name] || */ 0;
      })

      this.loans[owner.name] = personLoans;
    })
  } 

  recountLoans() {
    this.initializeLoans();

    this.bills.forEach(bill => {
      this.accountBill(bill);
    })
  }
}