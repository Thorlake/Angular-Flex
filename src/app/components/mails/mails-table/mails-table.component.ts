import { Component, OnInit, ViewChildren, QueryList, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Mail } from '@models/mail';
import { SortableThDirective, SortEvent } from '@directives/sortable-th.directive';
import { MailService } from '@api/mail.service';
import { MomentRange } from '@models/moment-range';

@Component({
  selector: 'app-mails-table',
  templateUrl: './mails-table.component.html',
  styleUrls: ['./mails-table.component.scss']
})
export class MailsTableComponent implements OnInit, AfterViewInit {

  private _dateRange: MomentRange;
  private _sortedColumn: string;
  private _collapsedRows: { [id: number]: boolean } = {};
  private _toColumnsInitialData: { [id: number]: { html: string, width: number }[] } = {};

  @ViewChildren(SortableThDirective)
  private _headers: QueryList<SortableThDirective>;

  @Input()
  set dateRange(value: MomentRange) {
    this._dateRange = value;
    this._collapsedRows = {};
    this.resetSortHeaders();
    this.load();
    setTimeout(() => {
      this.saveInitialToColumnData();
      this.truncateToColumnData();
    });
  }

  get dateRange(): MomentRange {
    return this._dateRange;
  }

  public mails: Mail[];
  hiddenMailsNumberInToColumn: { [id: number]: number } = {};

  @ViewChildren('to_column_overflow')
  toColumnCells: QueryList<ElementRef>;

  constructor(private mailService: MailService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.saveInitialToColumnData();
    // Angular's flow rule forbids updates the view after it has been composed
    // Leave thread to update view children
    setTimeout(() => {
      this.truncateToColumnData();
    });
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

  public tdClasses(column: string) {
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

  public onResize() {
    if (!this.toColumnCells) {
      return;
    }

    this.truncateToColumnData();
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

  // There has to be a better way not to save initial data and just hide spans
  // Right now they get removed from html
  private saveInitialToColumnData() {
    if (!this.toColumnCells) {
      return;
    }

    this._toColumnsInitialData = {};
    this.toColumnCells.forEach((cell: ElementRef) => {
      const children = [];
      for (const span of cell.nativeElement.children) {
        children.push({
          html: span.outerHTML,
          width: span.offsetWidth
        });
      }

      const id = cell.nativeElement.getAttribute('data-id');
      this._toColumnsInitialData[id] = children;
    });
  }

  private truncateToColumnData() {
    if (!this.toColumnCells) {
      return;
    }

    this.toColumnCells.forEach((cell: ElementRef) => {
      const cellRef = cell.nativeElement;
      const columnWidth = cellRef.offsetWidth;

      const id = cellRef.getAttribute('data-id');
      const children = this._toColumnsInitialData[id];
      let hiddenCount = children.length;

      const dotscommaWidth = 10;
      // Affects the second item in array. First one is displayed in any case
      let takenWidth = dotscommaWidth;
      const truncatedStrings = [];
      for (const span of children) {
        takenWidth += span.width + dotscommaWidth;
        if (takenWidth > columnWidth && truncatedStrings.length > 0) {
          truncatedStrings.push('...');
          break;
        }
        hiddenCount--;
        truncatedStrings.push(span.html);
      }

      this.hiddenMailsNumberInToColumn[id] = hiddenCount > 0 ? hiddenCount : undefined;
      cellRef.innerHTML = truncatedStrings.join(', ');
    });
  }
}
