import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './search/search.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { PokemonStatisticsComponent } from './pokemon-statistics/pokemon-statistics.component';
import { PokemonProfileComponent } from './pokemon-profile/pokemon-profile.component';
import { PokemonEvolutionComponent } from './pokemon-evolution/pokemon-evolution.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchComponent,    
    PokemonCardComponent,
    PokemonStatisticsComponent,
    PokemonProfileComponent,
    PokemonEvolutionComponent,
    routingComponents,
    PageNotFoundComponent,
    PokemonDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
