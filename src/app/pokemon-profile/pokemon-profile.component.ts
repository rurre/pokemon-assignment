import { Observable, BehaviorSubject } from 'rxjs';
import { IPokemonDetail } from './../ipokemon-detail';
import { Component, Input, OnInit } from '@angular/core';
import { toSentenceCase } from 'utils';

@Component({
  selector: 'app-pokemon-profile',
  templateUrl: './pokemon-profile.component.html',
  styleUrls: ['./pokemon-profile.component.css']
})
export class PokemonProfileComponent implements OnInit 
{
  @Input("pokemonDetails") detailsObs!: Observable<IPokemonDetail>;
  details!: IPokemonDetail;

  constructor() { }

  ngOnInit(): void 
  {    
    this.detailsObs.subscribe((val) => this.details = val);
  }

  getProfileStats(): Map<string,any>
  {
    let det = this.details;
    
    return new Map(
    [
      ["height", det.height + " m"],
      ["EVs", "none"],
      ["hatch steps", "none"],
      ["gender ratio", "none"],
      ["weight", det.weight + " kg"],
      
      ["abilities", det.abilities
        .map(x => toSentenceCase(x.ability.name))
        .join(", ")],

      ["egg group", "none"],
      ["catch rate", "none"],
    ]);
  }
}
