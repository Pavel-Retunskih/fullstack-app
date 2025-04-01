export type User = {
  id: string
  firstName: string;
  lastName: string;
  height: number;
  weight: number;
  gender: 'male' | 'female';
  residence: string;
  photoUrl: string;
}