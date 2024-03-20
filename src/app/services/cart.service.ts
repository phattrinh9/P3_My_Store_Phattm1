import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Order } from '../models/Order';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartItem[] = [];
  order: Order | undefined;

  constructor(private productService: ProductService) {}

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(productId: number, quantity: number): void {

    let isProductExistInCart = this.cart.find((item) => item.productId === productId);

    // change quantity 
    if (isProductExistInCart) { 
      isProductExistInCart.quantity = isProductExistInCart.quantity + quantity;
    } else {
      this.productService.getProducts().subscribe((response) => {
        //find product that need to add new product to cart
        let selectItem = response.find((product) => product.id === productId);
        if (selectItem) {
          let addCartItem = new CartItem();
          addCartItem.productId = productId;
          addCartItem.productURL = selectItem.url;
          addCartItem.productName = selectItem.name;
          addCartItem.productPrice = selectItem.price;
          addCartItem.quantity = quantity;
          this.cart.push(addCartItem);
        }
      });
    }
    alert('Added items!');
  }

  createOrder(order: Order): void {
    this.order = order;
    this.cart = [];
  }

  getOrder(): Order | undefined {
    return this.order;
  }
}
