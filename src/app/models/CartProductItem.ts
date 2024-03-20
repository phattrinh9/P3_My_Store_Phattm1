export class CartProductItem {
  productId: number;
  productName: string;
  productURL: string;
  productPrice: number;
  quantity: number;

  constructor() {
    this.productId = 0;
    this.productName = 'new cart item name';
    this.productURL = 'new cart item url';
    this.productPrice = 0.00;
    this.quantity = 0;
  }
}
