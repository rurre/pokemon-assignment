import { ProductStorageService } from './product-storage.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanNavigateToProductsService implements CanActivate
{
  constructor(private _storage: ProductStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    return this._storage.hasProducts;
  }
}
