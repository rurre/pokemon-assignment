import { PokemonApiService } from './../pokemon-api.service';
import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { getPokemonTypeColor, IPokemonDetail, IPokemonType, IPokemonStat, IPokemonSpecies } from './../ipokemon-detail';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable, BehaviorSubject } from 'rxjs';

const loading = "Loading...";

@Component({
  selector: 'app-pokemon-statistics',
  templateUrl: './pokemon-statistics.component.html',
  styleUrls: ['./pokemon-statistics.component.css']
})
export class PokemonStatisticsComponent implements OnInit 
{
  @Input("pokemonDetails") detailsObs!: Observable<IPokemonDetail>;
  details!: IPokemonDetail;

  speciesObs!: Observable<IPokemonSpecies>

  private _flavorTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>(loading);
  private _typeTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>(loading);

  private _pageLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pageLoaded = this._pageLoadedSubject.asObservable();
  
  flavorText: Observable<string> = this._flavorTextSubject.asObservable();
  typeText: Observable<string> = this._typeTextSubject.asObservable();

  constructor(private _activatedRoute: ActivatedRoute, private _pokemonApiService: PokemonApiService) { }

  ngOnInit(): void 
  { 
    this.detailsObs.subscribe((details) => 
    {
      this.details = details;
      this.speciesObs = this._pokemonApiService.getPokemonSpeciesFromUrl(details.species.url);
      this.speciesObs.subscribe(() => 
      {
        this.getFlavorText();
        this.getSpeciesText();
        this._pageLoadedSubject.next(true);
      });      
    });    
  }  

  getTypeColor(type: IPokemonType): string
  {    
    return getPokemonTypeColor(type) || "00000";
  }
  
  getSimpleStats(statObjects: IPokemonStat[]): {name: string, value: number}[]
  {
    let finalStats = [];
    for(let stat of statObjects)    
      finalStats.push({name: stat.stat.name, value: stat.base_stat});
    
    return finalStats;
  }

  getSpeciesText(): void
  {
    this.speciesObs.subscribe((species) =>
    {
      let text = species.genera.filter(x => x.language.name === "en")[0];
      this._typeTextSubject.next(text.genus); 
    });
  }

  getFlavorText(): void
  {
    this.speciesObs.subscribe((species) => 
      {
        let engFlavors = species.flavor_text_entries
          .filter(x => x.language.name === "en");

        console.log(engFlavors);
        
        let randomFlavor = engFlavors[Math.floor(Math.random() * engFlavors.length)];
        this._flavorTextSubject.next(randomFlavor.flavor_text);
      });
  }
}
