export interface Mail {
  id: number;
  from: string;
  to: string; // make it []
  subject: string;
  date: Date;
}
