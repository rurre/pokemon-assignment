import { PokemonApiService } from './../pokemon-api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  IPokemonDetail,
  IPokemonEvolution,
  IPokemonSpecies,
  getPokemonTypeColor,
} from './../ipokemon-detail';
import { Component, OnInit, Input } from '@angular/core';

interface IEvolutionInfo {
  evolvesAtLevel: number;
  evolvesInto: string;
  evolvesIntoImageUrl: string;
}

interface IEvolutionChainItem {
  name: string;
  url: string;
  level: number;
}

@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.css'],
})
export class PokemonEvolutionComponent implements OnInit {
  @Input('pokemonDetails') detailsObs!: Observable<IPokemonDetail>;
  details!: IPokemonDetail;

  speciesObs!: Observable<IPokemonSpecies>;
  species!: IPokemonSpecies;

  evolutionObs!: Observable<IPokemonEvolution>;
  evolution!: IPokemonEvolution;

  evolvedSpeciesObs!: Observable<IPokemonSpecies>;
  evolvedSpecies!: IPokemonSpecies;

  evolvedPokemonDetailsObs!: Observable<IPokemonDetail>;
  evolvedPokemonDetails!: IPokemonDetail;

  componentLoadedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  componentLoaded = this.componentLoadedSubject.asObservable();

  private _evolutionInfoSubject: BehaviorSubject<IEvolutionInfo | null> =
    new BehaviorSubject<IEvolutionInfo | null>(null);
  evolutionInfo = this._evolutionInfoSubject.asObservable();

  private _evolutionChain: IEvolutionChainItem[] = [];

  constructor(private _pokemonApiService: PokemonApiService) {}

  ngOnInit(): void {
    this.detailsObs.subscribe((det) => {
      this.details = det;

      this.speciesObs =
        this._pokemonApiService.getPokemonDataFromUrl<IPokemonSpecies>(
          this.details.species.url
        );
      this.speciesObs.subscribe((spec) => {
        this.species = spec;
        this.evolutionObs =
          this._pokemonApiService.getPokemonDataFromUrl<IPokemonEvolution>(
            spec.evolution_chain.url
          );
        this.evolutionObs.subscribe((evo) => {
          this.evolution = evo;
          this._pokemonApiService
            .getPokemonDataFromUrl<IPokemonSpecies>(evo.chain.species.url)
            .subscribe((spec) => {
              let evoChain = this._getEvolutionChain(evo);
              this._evolutionChain = evoChain;
              let nextPokemon = this._getNextPokemonInChain();
              let nextSpeciesUrl = nextPokemon?.url;
              if (!nextSpeciesUrl) {
                this.componentLoadedSubject.next(true);
                return;
              }
              this.evolvedSpeciesObs =
                this._pokemonApiService.getPokemonDataFromUrl<IPokemonSpecies>(
                  nextSpeciesUrl
                );
              this.evolvedSpeciesObs.subscribe((spec) => {
                this.evolvedSpecies = spec;
                this.evolvedPokemonDetailsObs =
                  this._pokemonApiService.getPokemonDataFromUrl<IPokemonDetail>(
                    spec.varieties[0].pokemon.url
                  );
                this.evolvedPokemonDetailsObs.subscribe((mon) => {
                  this.evolvedPokemonDetails = mon;
                  this.componentLoadedSubject.next(true);
                  this._evolutionInfoSubject.next(this._getEvolutionInfo());
                });
              });
            });
        });
      });
    });
  }

  private _getEvolutionChain(
    evo: IPokemonEvolution
  ): { name: string; url: string; level: number }[] {
    let chain: { name: string; url: string; level: number }[] = [];
    let chainLink: any = evo.chain;

    while (chainLink != null) {
      let species = chainLink.species;
      if (!species) break;
      chain.push({
        name: species.name,
        url: species.url,
        level: chainLink.evolution_details[0]?.min_level,
      });
      chainLink = chainLink.evolves_to[0];
    }
    return chain;
  }

  private _getEvolutionInfo() {
    let nextInChain = this._getNextPokemonInChain();
    let info: IEvolutionInfo = {
      evolvesInto: this.evolvedPokemonDetails.name,
      evolvesAtLevel: nextInChain?.level ?? 0,
      evolvesIntoImageUrl: this.evolvedPokemonDetails.sprites.front_default,
    };
    return info;
  }

  private _getNextPokemonInChain() {
    let nextIndex =
      this._evolutionChain.findIndex((x) => x.name === this.details.name) + 1;
    return nextIndex < this._evolutionChain.length
      ? this._evolutionChain[nextIndex]
      : undefined;
  }

  getTypeColor() {
    return '#' + getPokemonTypeColor(this.details.types[0]);
  }
}
