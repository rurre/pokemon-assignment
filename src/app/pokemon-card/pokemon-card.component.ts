import { PokemonListItem } from './../pokemon-list-item';
import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit, OnChanges //TODO: This whole folder doesn't work :(
{  
  @Input() listItem!: PokemonListItem

  constructor() 
  {

  }

  ngOnChanges(): void
  {
    console.log(`Things changed man: ${this.listItem.name}, ${this.listItem.imageUrl}`)
  }

  ngOnInit(): void 
  {

  }
}
