import { ActivatedRoute } from '@angular/router';
import { Input } from '@angular/core';
import { getPokemonTypeColor, IPokemonDetail, IPokemonType } from './../ipokemon-detail';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-statistics',
  templateUrl: './pokemon-statistics.component.html',
  styleUrls: ['./pokemon-statistics.component.css']
})
export class PokemonStatisticsComponent implements OnInit 
{
  @Input("pokemonDetails") details!: IPokemonDetail | null;

  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void 
  {
    
  }  

  getTypeColor(type: IPokemonType): string
  {    
    return getPokemonTypeColor(type) || "00000";
  }
}
