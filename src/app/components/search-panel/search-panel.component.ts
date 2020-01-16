import { MomentRange } from '@models/moment-range';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  selectedDateRange: MomentRange;
  @Output() searchSubmit = new EventEmitter<MomentRange>();

  constructor() { }

  ngOnInit() {
  }

  onDateRangeChange(event: any) {
    this.emitSubmitSearch();
  }

  onSearchClick() {
    this.emitSubmitSearch();
  }

  private emitSubmitSearch() {
    this.searchSubmit.emit(this.selectedDateRange);
  }
}
