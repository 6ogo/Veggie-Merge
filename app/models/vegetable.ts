export interface Vegetable {
  id: string;
  type: VegetableType;
  size: number;
  position: { x: number; y: number };
}

export enum VegetableType {
  Carrot = 'carrot',
  Tomato = 'tomato',
  Potato = 'potato',
  Cabbage = 'cabbage',
  Broccoli = 'broccoli'
}

export interface Score {
  points: number;
  timestamp: number;
}