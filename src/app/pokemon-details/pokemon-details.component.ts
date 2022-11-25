import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { PokemonApiService } from './../pokemon-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { getPokemonTypeColorByName, IPokemonDetail, IPokemonType } from './../ipokemon-detail';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit 
{
  private _pokemonSubject: Subject<IPokemonDetail> = new Subject();
  pokemonDetail: Observable<IPokemonDetail> = this._pokemonSubject.asObservable();

  private _errorMessageSubject: BehaviorSubject<string|null> = new BehaviorSubject<string|null>(null);
  errorMessage: Observable<string|null> = this._errorMessageSubject.asObservable();
  
  constructor(private _pokemonApiService: PokemonApiService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void 
  {
    this._activatedRoute.paramMap.subscribe(
      {
        next: (params:ParamMap) => 
        { 
          let name = params.get("name");
          if(name == null)
          {
            this._errorMessageSubject.next("Please select a Pokemon from the list.");
            return;
          }

          this._pokemonApiService.getPokemonDetailFromName(name)
            .subscribe(
            {
              next: (detail) => { this._pokemonSubject.next(detail); },
              error: (err:HttpErrorResponse) => 
              {
                if(err.status == 404)
                  this._errorMessageSubject.next(`Pokemon ${name} not found.`)
                else  
                  this._errorMessageSubject.next(err.message); 
              }
            });                   
        }
      });
  }

  getTypeColorFromDetail(detail: IPokemonDetail | null): string
  {    
    let empty = "000000";
    if(detail)
      return getPokemonTypeColorByName(detail.types[0].type.name) || empty;
    return empty;
  }
}
