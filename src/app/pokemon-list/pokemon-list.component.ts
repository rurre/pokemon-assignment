import { environment } from './../../environments/environment';
import { PokemonListResponse } from './../pokemon-list-response';
import { PokemonListItem } from './../pokemon-list-item';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { PokemonApiService } from './../pokemon-api.service';
import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit 
{
  private _pokemonItemsSubject: BehaviorSubject<PokemonListItem[]> = new BehaviorSubject<PokemonListItem[]>([]);
  pokemonItems: Observable<PokemonListItem[]> = this._pokemonItemsSubject.asObservable();

  private _isListLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  isListLoading: Observable<boolean> = this._isListLoadingSubject.asObservable();

  private _hasNextPage: boolean = false;
  private _hasPrevPage: boolean = false;

  hasNextPage(): boolean { return this._hasNextPage; };
  hasPrevPage(): boolean { return this._hasPrevPage; };
  
  reponseObserver: Observer<PokemonListResponse> = 
  {
    next: (val) => { this._handleResponse(this, val); },
    error: console.error,
    complete: () => { this._isListLoadingSubject.next(false); }
  };

  constructor(private _pokemonApiService: PokemonApiService) {}

  ngOnInit(): void 
  {
    this.getFirstPage();
  }

  private _handleResponse(instance:PokemonListComponent, response: PokemonListResponse)
  {    
    instance._isListLoadingSubject.next(true);    
    instance._pokemonItemsSubject.next(
      response.results.map((res) => 
        {
          this._isListLoadingSubject.next(false);
          let item = new PokemonListItem(res.name, res.url);          
          instance._pokemonApiService.getPokemonDetailFromUrl(res.url)
            .pipe(map(detail => detail.sprites.front_default))
            .subscribe({next:(url) => item.imageUrl = url})
          return item;
        }));
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
    if(!this._hasNextPage)
      return; 
    this._pokemonApiService.getNextPage(environment.pokemonPerListPage)
      .subscribe(this.reponseObserver);
  }

  getPrevPage()
  {
    if(!this._hasPrevPage)
      return;
    this._pokemonApiService.getPrevPage(environment.pokemonPerListPage)
      .subscribe(this.reponseObserver);
  }
}
