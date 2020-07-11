
import { Directive, EventEmitter, Input, Output, HostBinding, HostListener } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'div[sortable]'
})
export class SortableThDirective {
  private readonly _mapClassByDirection: { [key: string]: string } = {
    'asc': 'asc',
    'desc': 'desc',
    '': ''
  };

  private readonly _directionTransition: { [key: string]: SortDirection } = {
    'asc': 'desc',
    'desc': '',
    '': 'asc'
  };

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  @HostBinding('class')
  public get getClasses(): string {
    return this._mapClassByDirection[this.direction];
  }

  @HostListener('click')
  rotate() {
    this.direction = this._directionTransition[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
