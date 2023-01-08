export interface PokemonProduct {
  name: string;
  description: string;
  price: number;
  category: ['electronics', 'clothing', 'blankets'];
  imageUrl: string;
  phoneNumber: string;
  select: ['mobile', 'landline'];
}
