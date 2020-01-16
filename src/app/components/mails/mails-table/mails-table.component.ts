import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { Mail } from '@models/mail';
import { SortableThDirective, SortEvent } from '@directives/sortable-th.directive';
import { MailService } from '@api/mail.service';
import { MomentRange } from '@models/moment-range';

@Component({
  selector: 'app-mails-table',
  templateUrl: './mails-table.component.html',
  styleUrls: ['./mails-table.component.scss']
})
export class MailsTableComponent implements OnInit {

  private _dateRange: MomentRange;

  @Input() set dateRange(value: MomentRange) {
    this._dateRange = value;
    this.load();
  }

  get dateRange(): MomentRange {
    return this._dateRange;
  }

  mails: Mail[];
  @ViewChildren(SortableThDirective) headers: QueryList<SortableThDirective>;

  constructor(private mailService: MailService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.mails = this.mailService.getAll(this.dateRange);
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    if (direction === '') {
      column = 'id';
      direction = 'asc';
    }

    this.mails = this.mails.sort((mail1, mail2) => {
      const val1 = mail1[column];
      const val2 = mail2[column];
      const res = val1 < val2 ? -1 : val1 > val2 ? 1 : 0;
      return direction === 'asc' ? res : -res;
    });
  }
}
