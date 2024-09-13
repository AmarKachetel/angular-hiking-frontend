// src/app/models/rando.model.ts
export interface Rando {
  id: number;
  title: string;
  description: string;
  location: string;
  distance: number;
  duration: string;
  difficulty: string;
  image: string;
  coordinates?: number[]; // facultatif si les coordonnées ne sont pas toujours présentes
  avis?: any[]; // facultatif
  reservations?: any[]; // facultatif
  user?: any; // facultatif
}
