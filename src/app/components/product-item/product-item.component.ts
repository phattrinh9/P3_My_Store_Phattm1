import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartItem } from 'src/app/models/CartItem';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product: Product;
  selectOptions: number[] = [1, 2, 3, 4, 5, 6];
  quantity: number = 1;
  @Output() addCart: EventEmitter<CartItem> = new EventEmitter();

  constructor() {
    this.product = {
      id: 0,
      name: '',
      price: 0.0,
      url: '',
      description: '',
    };
  }

  addToCart(productId: number): void {
    const cartItem = new CartItem();
    cartItem.productId = productId;
    cartItem.quantity = this.quantity;
    this.addCart.emit(cartItem);
  }
}
