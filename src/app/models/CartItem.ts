export class CartItem {
  productId: number;
  productURL: string;
  productName: string;
  productPrice: number;
  quantity: number;

  constructor() {
    this.productId = 0;
    this.productURL = '';
    this.productName = '';
    this.productPrice = 0;
    this.quantity = 0;
  }
}
