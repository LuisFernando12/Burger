type Category = 'FOOD' | 'DRINK' | 'DESSSERT';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  amount: number;
  suplier?: string;
  category: Category;
  ingredientIds: [number];
}
