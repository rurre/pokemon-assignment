import { PokemonProduct } from './pokemon-product';
import { Injectable } from '@angular/core';
import { deepCopy } from '@angular-devkit/core/src/utils/object';

const storageToken = 'pokemonProducts';

@Injectable({
  providedIn: 'root',
})
export class ProductStorageService {
  private _products: PokemonProduct[] = [];

  constructor() {
    this._loadFromStorage();
  }

  get products(): PokemonProduct[] {
    return this._products;
  }

  get hasProducts(): boolean {
    return this._products && this._products.length > 0;
  }

  private _loadFromStorage(): void {
    let json = localStorage.getItem(storageToken);
    if (!json) return;

    try {
      this._products = JSON.parse(json) as PokemonProduct[];
    } catch {
      this._products = [];
    }
  }

  public addToStorage(values: PokemonProduct[]): void {
    this._products = this._products.concat(values);
    localStorage.setItem(storageToken, JSON.stringify(this._products));
  }
}
