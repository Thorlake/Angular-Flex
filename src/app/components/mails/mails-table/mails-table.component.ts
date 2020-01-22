import { Component, OnInit, ViewChildren, QueryList, Input, ElementRef, AfterViewInit, SimpleChange, OnChanges } from '@angular/core';
import { Mail } from '@models/mail';
import { SortableThDirective, SortEvent } from '@directives/sortable-th.directive';
import { MailService } from '@api/mail.service';
import { MomentRange } from '@models/moment-range';

@Component({
  selector: 'app-mails-table',
  templateUrl: './mails-table.component.html',
  styleUrls: ['./mails-table.component.scss']
})
export class MailsTableComponent implements OnInit, OnChanges {

  private _sortedColumn: string;
  private _collapsedRows: { [id: number]: boolean } = {};
  @ViewChildren(SortableThDirective) private _headers: QueryList<SortableThDirective>;

  @Input() public dateRange: MomentRange;
  public mails: Mail[] = [];
  public hiddenMailsNumberInToColumn: { [id: number]: number } = {};

  constructor(private mailService: MailService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    const dateRangeChange = changes['dateRange'];
    if (dateRangeChange) {
      this.dateRange = dateRangeChange.currentValue;
      this._collapsedRows = {};
      this.resetSortHeaders();
      this.load();
    }
  }

  public onSort({ column, direction }: SortEvent) {
    if (direction === '') {
      column = 'id';
      direction = 'asc';
    }

    this.resetSortHeaders(column);

    this.mails = this.mails.sort((mail1, mail2) => {
      const val1 = mail1[column];
      const val2 = mail2[column];
      const res = this.compare(val1, val2);
      return direction === 'asc' ? res : -res;
    });
  }

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Column_combinator
  // replace with column combinator (||) when it's released
  public rowClasses(column: string) {
    const classes = {
      'font-weight-bold': this._sortedColumn === column,
    };
    return classes;
  }

  public toogleCollapseRow(column: number) {
    this._collapsedRows[column] = !this._collapsedRows[column];
  }

  public isRowCollapsed(column) {
    if (this._collapsedRows[column] === undefined) {
      this._collapsedRows[column] = true;
    }
    return this._collapsedRows[column];
  }

  private load() {
    this.mails = this.mailService.getAll(this.dateRange);
  }

  private resetSortHeaders(keepColumnSorted?: string) {
    this._sortedColumn = keepColumnSorted;

    if (!this._headers) {
      return;
    }

    this._headers.forEach(header => {
      if (!keepColumnSorted || header.sortable !== keepColumnSorted) {
        header.direction = '';
      }
    });
  }

  private compare(first, second) {
    let a = first;
    let b = second;

    const aType = Object.prototype.toString.call(a);
    const bType = Object.prototype.toString.call(b);

    if (aType !== bType) {
      return 0;
    }

    let revertSort = 1;
    if (aType === '[object String]') {
      a = a.toUpperCase();
      b = b.toUpperCase();
    } else if (aType === '[object Date]') {
      // Date sorting has to be inverted to read better
      revertSort = -1;
    } else if (aType === '[object Array]') {
      a = a[0].toUpperCase();
      b = b[0].toUpperCase();
    }

    let res = 0;
    if (a > b) {
      res = 1;
    } else if (a < b) {
      res = -1;
    }

    return res * revertSort;
  }
}
