import { environment } from './../../environments/environment';
import { PokemonListResponse } from './../pokemon-list-response';
import { PokemonListItem } from './../pokemon-list-item';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { PokemonApiService } from './../pokemon-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit 
{
  private _pokemonItemsSubject: BehaviorSubject<PokemonListItem[]> = new BehaviorSubject<PokemonListItem[]>([]);
  pokemonItems: Observable<PokemonListItem[]> = this._pokemonItemsSubject.asObservable();

  private _hasListLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  hasListLoaded: Observable<boolean> = this._hasListLoadedSubject.asObservable();

  private _hasNextPage: boolean = false;
  private _hasPrevPage: boolean = false;
  
  hasNextPage(): boolean { return this._hasNextPage; };
  hasPrevPage(): boolean { return this._hasPrevPage; };
  
  reponseObserver: Observer<PokemonListResponse> = 
  {
    next: (val) => {this._handleResponse(this, val);},
    error: console.error,
    complete: () => {this._hasListLoadedSubject.next(true);}
  };

  constructor(private _pokemonApiService: PokemonApiService) 
  {
    
  }  

  ngOnInit(): void 
  {
    this.getFirstPage();
  }

  private _handleResponse(instance:PokemonListComponent, response: PokemonListResponse)
  {
    instance._hasListLoadedSubject.next(false);
    instance._pokemonItemsSubject.next(
      response.results.map(res => 
        new PokemonListItem(res.name, res.url, "https://placekitten.com/400/400")));

      instance._hasNextPage = response.next != null;
    instance._hasPrevPage = response.previous != null;
  }

  getFirstPage()
  {
    this._pokemonApiService.getFirstPage(environment.pokemonPerListPage)
      .subscribe(this.reponseObserver);      
  }

  getNextPage()
  {
    this._pokemonApiService.getNextPage(environment.pokemonPerListPage)
      .subscribe(this.reponseObserver);
  }

  getPrevPage()
  {
    this._pokemonApiService.getPrevPage(environment.pokemonPerListPage)
      .subscribe(this.reponseObserver);
  }
}
