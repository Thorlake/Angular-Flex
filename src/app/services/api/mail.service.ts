import { MomentRange } from '@models/moment-range';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mail } from '@models/mail';

@Injectable({ providedIn: 'root' })
export class MailService {
  constructor(private http: HttpClient) { }

  getAll(dateRange: MomentRange): Mail[] {
    let mails = this.GetAll();
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      mails = mails.filter(mail => dateRange.startDate.isSameOrBefore(mail.date) && dateRange.endDate.isSameOrAfter(mail.date));
    }
    return mails;
  }

  private GetAll(): Mail[] {
    return [
      {
        id: 1,
        from: 'aaa@example.com',
        to: ['zzz.zzz@example.com'],
        subject: '[ HR-888 ] Notice of official announcement',
        date: new Date().withoutTime().addMinutes(20),
        attachment: ''
      },
      {
        id: 2,
        from: 'bbb.bbbb@example.com',
        to: ['yyy@example.com'],
        subject: '[web:333] "Web Contact"',
        date: new Date().withoutTime().addMinutes(10),
        attachment: ''
      },
      {
        id: 3,
        from: 'ccc@example.com',
        to: ['xxx@example.com', 'ddd@example.com'],
        subject: 'Happy New Year! Greetings for the New Year.',
        date: new Date().withoutTime().addSeconds(1),
        attachment: '/assets/images/attachment1.jpg'
      },
      {
        id: 4,
        from: 'ddd.dddd@example.com',
        to: ['vvv.vvv@example.com', 'qqq.qqqq@example.com'],
        subject: '[HR-887(Revised: Office Expansion Project Team)] Notice of office',
        date: new Date(2020, 0, 1, 1),
        attachment: ''
      },
      {
        id: 5,
        from: 'eee@example.com',
        to: ['sss@example.com', 'ooo@example.com', 'ppp@example.com'],
        subject: '[Github] Logout page',
        date: new Date(2020, 0, 1, 1),
        attachment: ''
      },
      {
        id: 6,
        from: 'fff.ffff@example.com',
        to: ['qqq.qqq@example.com'],
        subject: '[dev] Postfix 3.1.12 /3.2.9/3.3.4/3.4.5',
        date: new Date(2020, 0, 1, 1),
        attachment: ''
      },
      {
        id: 7,
        from: 'ggg@example.com',
        to: ['ppp@example.com'],
        subject: 'Re: [Github] Brush-up on loading animation',
        date: new Date(2020, 0, 1, 1),
        attachment: ''
      },
      {
        id: 8,
        from: 'hhh.hhh@example.com',
        to: ['ooo.ooo@example.com'],
        subject: 'Workplace Summary for sample, Inc.: Jun 2 - Jun 9',
        date: new Date(2020, 0, 1, 1),
        attachment: '/assets/images/attachment2.jpg'
      },
      {
        id: 9,
        from: 'iii@example.com',
        to: ['nnn@example.com'],
        subject: 'I love you',
        date: new Date(2019, 11, 31, 1),
        attachment: '/assets/images/attachment3.jpg'
      },
      {
        id: 10,
        // tslint:disable-next-line: max-line-length
        from: 'Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso@example.com',
        // tslint:disable-next-line: max-line-length
        to: ['Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso@example.com'],
        subject: '[info:888] ABC EQUIPMENT COMPANY',
        date: new Date(2019, 11, 31, 1),
        attachment: ''
      }
    ];
  }
}
