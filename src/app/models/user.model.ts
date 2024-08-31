export interface UserProfile {
  id: number;
  username: string;
  email: string;
  password?: string; // Ajoutez le champ password uniquement si vous voulez permettre la mise à jour du mot de passe
}
