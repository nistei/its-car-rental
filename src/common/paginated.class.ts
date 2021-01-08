export class Paginated<T> {
  results: T[];
  count: number;
  total: number;
  next: number;
}
