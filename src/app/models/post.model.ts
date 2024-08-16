export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date; // Ajoutez cette ligne si la propriété `createdAt` est nécessaire
}
