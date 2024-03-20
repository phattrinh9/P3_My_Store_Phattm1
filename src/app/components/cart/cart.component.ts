import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem';
import { Order } from 'src/app/models/Order';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cart: CartItem[] = [];
  fullname: string = '';
  address: string = '';
  creditCard: string = '';
  total: number = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotalAmount();
  }

  onQuantityChange(cartItem: CartItem): void {
    if (cartItem.quantity == 0) {
      let index = this.cart.findIndex(
        (item) => item.productId === cartItem.productId
      );
      this.cart.splice(index, 1);
      alert('Removed from cart!');
    }
    this.calculateTotalAmount();
  }

  onSubmit(): void {
    let order = new Order(this.fullname, this.address, this.total);
    this.cartService.createOrder(order);
    this.router.navigateByUrl('/confirmation');
  }

  private calculateTotalAmount(): void {
    this.total = 0;
    this.cart.forEach(
      (item) => (this.total += item.productPrice * item.quantity)
    );
    this.total = Math.round(this.total * 100) / 100;
  }
}
