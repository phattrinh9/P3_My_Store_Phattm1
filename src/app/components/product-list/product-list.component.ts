import { Component } from '@angular/core';
import { CartProductItem } from 'src/app/models/CartProductItem';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((response) => {
      this.products = response;
    });
  }

  // add product item to cart
  addItemToCart(cartProductItem: CartProductItem): void {
    this.cartService.addItemToCart(cartProductItem.productId, cartProductItem.quantity);
  }
}
