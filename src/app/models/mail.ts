export interface Mail {
  id: number;
  from: string;
  to: string[];
  subject: string;
  date: Date;
  attachment: string;
}
