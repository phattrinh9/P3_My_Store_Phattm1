export class Order {
  name: string;
  amount: number;
  address: string;
  creditCard: string;

  constructor(name: string, address: string, amount: number, creditCard: string) {
    this.name = name;
    this.amount = amount;
    this.address = address;
    this.creditCard = creditCard;

  }
}
