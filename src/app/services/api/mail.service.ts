import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from '@models/mail';

@Injectable({ providedIn: 'root' })
export class MailService {
  constructor(private http: HttpClient) { }

  getAll(): Mail[] {
    return [
      {
        from: 'From one',
        to: 'To one',
        subject: 'Subject one',
        date: new Date()
      },
      {
        from: 'From two',
        to: 'To two',
        subject: 'Subject two',
        date: new Date()
      },
      {
        from: 'From three',
        to: 'To three',
        subject: 'Subject three',
        date: new Date()
      },
      {
        from: 'From four',
        to: 'To four',
        subject: 'Subject four',
        date: new Date()
      },
      {
        from: 'From five',
        to: 'To five',
        subject: 'Subject five',
        date: new Date()
      }
    ];
  }
}
