import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProductItem } from 'src/app/models/CartProductItem';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})
export class ProductItemDetailComponent {
  product: Product;
  selectedProductId: number;
  quantity: number = 1;
  
  isInStock: boolean;
  selectOptions: number[] = [1, 2, 3, 4, 5];

  constructor(
      private activatedRoute: ActivatedRoute,
      private productService: ProductService,
      private cartService: CartService
  ) {
    this.product = new Product();
    this.isInStock = false;
    this.selectedProductId = 0;
  }

  ngOnInit(): void {
    // Init inbound navigate
    this.activatedRoute.params.subscribe((response) => {
      this.selectedProductId = Number(response['id']);
    });

    this.productService.getProducts().subscribe((response) => {

      // Get product and check product in stock
      let selectedProduct = response.find((item) => item.id === this.selectedProductId);
      if (selectedProduct) {
        this.isInStock = true;
        this.product = selectedProduct;
      }
    });
  }

  addItemToCart(): void {
    this.cartService.addItemToCart(this.selectedProductId, Number(this.quantity));
  }
}
