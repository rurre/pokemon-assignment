import { PokemonApiService } from './../pokemon-api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPokemonDetail, IPokemonEvolution, IPokemonSpecies, getPokemonTypeColor } from './../ipokemon-detail';
import { Component, OnInit, Input } from '@angular/core';

interface IEvolutionInfo
{
  evolvesAtLevel: number;
  evolvesInto: string;
  evolvesIntoImageUrl: string;
}

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.css']
})
export class PokemonEvolutionComponent implements OnInit
{
  @Input("pokemonDetails") detailsObs!: Observable<IPokemonDetail>;
  details!: IPokemonDetail;
  
  speciesObs!: Observable<IPokemonSpecies>;
  species!: IPokemonSpecies;
  
  evolutionObs!: Observable<IPokemonEvolution>;
  evolution!: IPokemonEvolution;
  
  evolvedPokemonDetailsObs!: Observable<IPokemonDetail>
  evolvedPokemonDetails!: IPokemonDetail;
  
  componentLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  componentLoaded = this.componentLoadedSubject.asObservable();

  private _evolutionInfoSubject: BehaviorSubject<IEvolutionInfo|null> = new BehaviorSubject<IEvolutionInfo|null>(null);
  evolutionInfo = this._evolutionInfoSubject.asObservable();
  
  constructor(private _pokemonApiService: PokemonApiService) { }

  ngOnInit(): void
  {
    this.detailsObs.subscribe((det) =>
    {
      this.details = det;
      
      this.speciesObs = this._pokemonApiService.getPokemonDataFromUrl<IPokemonSpecies>(this.details.species.url);
      this.speciesObs.subscribe((spec) =>
      {
        this.species = spec;
        this.evolutionObs = this._pokemonApiService.getPokemonDataFromUrl<IPokemonEvolution>(spec.evolution_chain.url);
        this.evolutionObs.subscribe((evo) =>
        {
          this.evolution = evo;
          this._pokemonApiService.getPokemonDataFromUrl<IPokemonSpecies>(evo.chain.evolves_to[0].species.url).subscribe(spec =>
            {
              this.evolvedPokemonDetailsObs = this._pokemonApiService.getPokemonDataFromUrl<IPokemonDetail>(spec.varieties[0].pokemon.url);
              this.evolvedPokemonDetailsObs.subscribe(evoDetails =>
                {
                  this.evolvedPokemonDetails = evoDetails;
                  this._evolutionInfoSubject.next(this._getEvolutionInfo());
                  this.componentLoadedSubject.next(true);
                });
            });
        });
      });
    });
  }

  private _getEvolutionInfo()
  {
    let evolve = this.evolution.chain.evolves_to[0];
    let info =
    {
      evolvesInto: evolve.species.name,
      evolvesAtLevel: evolve.evolution_details[0].min_level,
      evolvesIntoImageUrl: this.evolvedPokemonDetails.sprites.front_default,
    };
    return info;
  }

  getTypeColor()
  {
    return getPokemonTypeColor(this.details.types[0]);
  }
}
