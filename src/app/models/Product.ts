export class Product {
  id: number;
  name: string;
  price: number;
  description: string;
  url: string;

  constructor() {
    this.id = 0;
    this.name = 'new product name';
    this.price = 0.00;
    this.description = 'new product description';
    this.url = 'new product url';
  }
}
