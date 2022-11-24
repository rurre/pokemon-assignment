export interface IPokemonAbility 
{
  ability:
  {
    name: string;
    url: string;
  }
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonForm
{
  name: string;
  url: string;
}

export interface IPokemonIndex
{
  game_index: number;
  version:
  {
    name: string;
    url: string;
  }
}

export interface IPokemonHeldItem
{
  name: string;
  url: string;
}

export interface IPokemonMove
{
  move: 
  {
    name: string;
    url: string;
  }
  version_group_details: 
  [
    {
      level_learned_at: number;
      move_learn_method: 
      {
        name: string;
        url: string;
      }
      version_group:
      {
        name: string;
        url: string;
      }
    }
  ]
}

export interface IPokemonSpecies
{
  name: string;
  url: string;
}

export interface IPokemonSprites
{
  back_default: string;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other:
  {
    dream_world:
    {
      front_default: string | null;
      front_famale: string | null;      
    }
    home:
    {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    }
    official_artwork:
    {
      front_default: string;
    }
  }
}

export interface IPokemonStat
{
  base_stat: number;
  effort: number;
  stat:
  {
    name: string;
    url: string;
  }
}

export interface IPokemonType
{
  slot: number;
  type:
  {
    name: string;
    url: string;
  }
}

export interface IPokemonDetail 
{
  abilities: IPokemonAbility[];
  base_experience: number;
  forms: IPokemonForm[];
  game_indices: IPokemonIndex[];
  height: number;
  held_items: IPokemonHeldItem[];
  id: number;
  is_default: boolean;
  location_area_enounters: string;
  moves: IPokemonMove[];
  name: string;
  order: number;
  past_types: IPokemonType[];
  species: IPokemonSpecies;
  sprites: IPokemonSprites;
  stats: IPokemonStat[];
  types: IPokemonType[];
  weight: number;
}

const typeColorHexCodes: Map<string,string> = new Map( 
[
  ["normal", "a8a878"],
  ["grass", "78c850"],
  ["ground", "e0c068"],
  ["fighting", "c03028"],
  ["rock", "b8a038"],
  ["steel", "b8b8d0"],
  ["fire", "f08030"],
  ["electric", "f8d030"],
  ["flying", "a890f0"],
  ["psychic", "f85888"],
  ["bug", "a8b820"],
  ["dragon", "7038f8"],
  ["water", "6890f0"],
  ["ice", "98d8d8"],
  ["poison", "a040a0"],
  ["dark", "705848"],
  ["ghost", "705898"],
  ["fairy", "ffaec9"]
]);

export function getPokemonTypeColorByName(typeName: string)
{
  return typeColorHexCodes.get(typeName);
}

export function getPokemonTypeColor(type: IPokemonType)
{  
  return typeColorHexCodes.get(type.type.name);
}