import { Injectable } from '@angular/core';
import { CartProductItem as CartProductItem } from '../models/CartProductItem';
import { Order } from '../models/Order';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: CartProductItem[] = [];
  order: Order | undefined;

  constructor(private productService: ProductService) { }

  getCart(): CartProductItem[] {
    return this.cart;
  }

  addItemToCart(productId: number, quantity: number): void {

    let isProductExistInCart = this.cart.find((item) => item.productId === productId);

    // change quantity 
    if (isProductExistInCart) {
      isProductExistInCart.quantity = isProductExistInCart.quantity + quantity;
    } else {
      this.productService.getProducts().subscribe((response) => {
        //find product that need to add new product to cart
        let selectItem = response.find((product) => productId === product.id);
        if (selectItem) {

          let addCartItem = new CartProductItem();

          // Init and add new product item into cart
          addCartItem.productId = productId;
          addCartItem.productURL = selectItem.url;
          addCartItem.productName = selectItem.name;
          addCartItem.productPrice = selectItem.price;
          addCartItem.quantity = quantity;
          this.cart.push(addCartItem);
        }
      });
    }
    alert('Items has added to cart!');
  }

  createOrder(order: Order): void {
    // create order with item in cart
    this.cart = [];
    this.order = order;
  }

  getOrder(): Order | undefined {
    return this.order;
  }
}
