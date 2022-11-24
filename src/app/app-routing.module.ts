import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: "full"},
  {path: 'home', component: PokemonListComponent },
  {path: 'detail', component: PokemonDetailsComponent},

  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: "not-found", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [PokemonListComponent]