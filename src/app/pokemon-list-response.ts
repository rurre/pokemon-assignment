import { PokemonListItem } from "./pokemon-list-item";

export class PokemonListResponse 
{
  count: number = 0;
  next: string | null = null;
  previous: string | null = null;
  results: PokemonListItem[] = [];
}
