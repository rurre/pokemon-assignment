import { map } from 'rxjs/operators';

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
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate:
  {
    name: string;
    url: string;
  };

  pokedex_numbers:
  [
    {
      entry_number: number;
      pokedex:
      {
        name: string;
        url: string;
      }
    }
  ];

  egg_groups:
  [
    {
      name: string;
      url: string;
    }
  ];

  color:
  {
    name: string;
    url: string;
  };

  shape:
  {
    name: string;
    url: string;
  };

  evolves_from_species:
  {
    name: string
    url: string;
  };

  evolution_chain:
  {
    url: string
  };
  habitat: any
  generation:
  {
    name: string;
    url: string;
  };

  names:
  [
    {
      name: string;
      language:
      {
        name: string;
        url: string;
      }
    }
  ]

  flavor_text_entries:
  [
    {
      flavor_text: string;
      language:
      {
        name: string;
        url: string;
      };

      version:
      {
        name: string;
        url: string;
      }
    }
  ];

  form_descriptions:
  [
    {
      description: string;
      language:
      {
        name: string;
        url: string;
      }
    }
  ];
  genera:
  [
    {
      genus: string;
      language:
      {
        name: string;
        url: string;
      }
    }
  ];
  varieties:
  [
    {
      is_default: boolean;
      pokemon:
      {
        name: string;
        url: string;
      }
    }
  ]
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
  species:
  {
    name:string;
    url: string
  };
  sprites: IPokemonSprites;
  stats: IPokemonStat[];
  types: IPokemonType[];
  weight: number;
}

export interface IPokemonEvolution
{
  baby_trigger_item: any;
  chain:
  {
    evolution_details: any[];
    evolves_to:
    {
      evolution_details:
      {
        gender: any;
        held_item: any;
        item: any;
        known_move: any;
        known_move_type: any;
        location: any;
        min_affection: any;
        min_beauty: number;
        min_happiness: number;
        min_level: number;
        needs_overworld_rain: boolean;
        party_species: any;
        party_type: any;
        relative_physical_stats: any;
        time_of_day: string;
        trade_species: any;
        trigger:
        {
          name: string;
          url: string;
        };
        turn_upside_down: boolean;

      }[];
      is_baby: boolean;
      species:
      {
        name: string;
        url: string;
      }
    }[]
    is_baby: boolean;
    species:
    {
      name: string;
      url: string;
    }
  };
  id: number;
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