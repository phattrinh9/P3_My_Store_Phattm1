import { CartProductItem } from 'src/app/models/CartProductItem';
import { Product } from 'src/app/models/Product';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product: Product;
  @Output() addToCart: EventEmitter<CartProductItem> = new EventEmitter();
  selectOptions: number[] = [1, 2, 3, 4, 5];
  quantity: number = 1;

  constructor() {
    this.product = {
      id: 0,
      name: '',
      price: 0.0,
      url: '',
      description: '',
    };
  }

  addItemToCart(productId: number): void {
    const cartProductItem = new CartProductItem();
    cartProductItem.productId = productId;
    cartProductItem.quantity = this.quantity;
    this.addToCart.emit(cartProductItem);
  }
}
