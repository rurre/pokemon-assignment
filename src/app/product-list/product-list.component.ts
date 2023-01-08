import { PokemonProduct } from './../pokemon-product';
import { ProductStorageService } from './../product-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: PokemonProduct[] = [];

  constructor(private _storage: ProductStorageService) {}

  ngOnInit(): void {
    this.products = this._storage.products;
  }
}
