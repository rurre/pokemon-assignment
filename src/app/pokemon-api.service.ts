import { PokemonListResponse } from './pokemon-list-response';
import { PokemonListItem } from './pokemon-list-item';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService 
{
  private _nextOffset: number = 0;

  constructor(private _httpClient: HttpClient) 
  {
  }

  ngOnInit()
  {
  }

  private _getPokemonList(count: number = 30, offset: number = 0): Observable<PokemonListResponse>
  {
    let params = {
      limit: count,
      offset: offset
    }
    return this._httpClient.get<PokemonListResponse>(`${environment.pokemonApiBase}/pokemon/`, {params:new HttpParams().appendAll(params)});
  }

  getNextPage(count: number)
  {
    let offset = this._nextOffset;
    this._nextOffset = this._nextOffset + count;
    return this._getPokemonList(count, offset);
  }

  getPrevPage(count: number)
  {
    this._nextOffset = Math.max(this._nextOffset - count, 0);
    return this._getPokemonList(count, this._nextOffset - 30);
  }
}
