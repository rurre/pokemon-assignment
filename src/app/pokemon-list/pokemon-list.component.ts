import { PokemonListResponse } from './../pokemon-list-response';
import { PokemonListItem } from './../pokemon-list-item';
import { Observable, BehaviorSubject } from 'rxjs';
import { PokemonApiService } from './../pokemon-api.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit 
{
  private _itemsPerPage: number = 30;
  private _pokemonItemsSubject: BehaviorSubject<PokemonListItem[]> = new BehaviorSubject<PokemonListItem[]>([]);
  pokemonItems: Observable<PokemonListItem[]> = this._pokemonItemsSubject.asObservable();

  private _hasNextPage: boolean = false;
  private _hasPrevPage: boolean = false;
  
  hasNextPage(): boolean { return this._hasNextPage; };
  hasPrevPage(): boolean { return this._hasPrevPage; };
    
  constructor(private _pokemonApiService: PokemonApiService) 
  {
    
  }  

  ngOnInit(): void 
  {
    this.getNextPage();
  }

  private _handleResponse(instance:PokemonListComponent, response: PokemonListResponse)
  {
    instance._pokemonItemsSubject.next(response.results);
    instance._hasNextPage = response.next != null;
    instance._hasPrevPage = response.previous != null;
  }

  getNextPage()
  {
    this._pokemonApiService.getNextPage(this._itemsPerPage)
      .subscribe({next:(val) => this._handleResponse(this, val)});
  }

  getPrevPage()
  {
    this._pokemonApiService.getPrevPage(this._itemsPerPage)
      .subscribe({next:(val) => this._handleResponse(this, val)});
  }

/*
  getNextPage(count: number = 30)
  {
    this.nextOffset = this.nextOffset + count;
    this._getListItems(count);
  }

  getPrevPage(count: number = 30)
  {
    this.nextOffset = Math.max(this.nextOffset - count, 0);
    this._getListItems(count);
  }

  private _getListItems(count: number)
  {
    return this._pokemonApiService._getPokemonList(count, this.nextOffset)
      .subscribe({next: (response) => { this.pokemonItems = response.results; }})
  }
*/

  //TODO: Check if this is still needed
  private getIntParam(url: URL, paramName: string): number | null
  {
    if(url == null)
      return null;
    
    let param = url.searchParams.get(paramName);    
    return param != null ? Number.
    parseInt(param) : null;
  }
}
