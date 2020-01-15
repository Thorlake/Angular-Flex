import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from '@models/mail';

@Injectable({ providedIn: 'root' })
export class MailService {
  constructor(private http: HttpClient) { }

  getAll(): Mail[] {
    return [
      {
        id: 1,
        from: 'From one',
        to: 'To one',
        subject: 'Happy New Year! Greetings for the New Year',
        date: new Date(2019, 1, 1)
      },
      {
        id: 2,
        from: 'From two',
        to: 'To two',
        subject: 'Subject two',
        date: new Date(2019, 1, 2)
      },
      {
        id: 3,
        from: 'From three',
        to: 'To three',
        subject: 'Subject three',
        date: new Date(2019, 1, 3)
      },
      {
        id: 4,
        from: 'From four',
        to: 'To four',
        subject: 'Subject four',
        date: new Date(2019, 1, 4)
      },
      {
        id: 5,
        from: 'From five',
        to: 'To five',
        subject: 'Subject five',
        date: new Date(2020, 1, 1)
      }
    ];
  }
}
