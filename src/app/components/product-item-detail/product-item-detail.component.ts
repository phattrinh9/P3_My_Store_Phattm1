import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent {
  options: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  product: Product;
  queryProductId: number;
  hasProduct: boolean;
  quantity: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.product = new Product();
    this.queryProductId = 0;
    this.hasProduct = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res) => {
      this.queryProductId = Number(res['id']);
    });

    this.productService.getProducts().subscribe((res) => {
      let foundProduct = res.find((item) => item.id === this.queryProductId);
      if (foundProduct) {
        this.product = foundProduct;
        this.hasProduct = true;
      }
    });
  }

  addToCart(): void {
    this.cartService.addToCart(this.queryProductId, Number(this.quantity));
  }
}
