import { Component } from '@angular/core';
import { CartProductItem } from 'src/app/models/CartProductItem';
import { Order } from 'src/app/models/Order';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: CartProductItem[] = [];
  fullname: string = '';
  address: string = '';
  creditCard: string = '';
  total: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotalAmount();
  }

  // submit shopping cart
  onSubmit(): void {
    let order = new Order(this.fullname, this.address, this.total, this.creditCard);
    this.cartService.createOrder(order);

    // naviagte to confirmation page when success shopping
    this.router.navigateByUrl('/confirmation');
  }

  // trigger when number of item change in cart
  onQuantityChange(cartProductItem: CartProductItem): void {
    if (cartProductItem.quantity == 0) {
      let index = this.cart.findIndex(
        (item) => item.productId === cartProductItem.productId
      );
      this.cart.splice(index, 1);
      alert('This product is removed from cart!');
    }
    this.calculateTotalAmount();
  }

 

  private calculateTotalAmount(): void {
    this.total = 0;
    this.cart.forEach(
      (item) => (this.total += item.productPrice * item.quantity)
    );
    this.total = Math.round(this.total * 100) / 100;
  }
}
