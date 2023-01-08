import { CanNavigateToProductsService } from './can-navigate-to-products.service';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PokemonListComponent, title: 'Home' },
  { path: 'detail', component: PokemonDetailsComponent, title: 'Details' },
  {
    path: 'detail/:name',
    component: PokemonDetailsComponent,
    title: 'Details',
  },
  {
    path: 'create-product',
    component: CreateProductComponent,
    title: 'Create Product',
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    title: 'Products',
    canActivate: [CanNavigateToProductsService],
  },
  { path: 'not-found', component: PageNotFoundComponent, title: 'Not Found' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [PokemonListComponent];
