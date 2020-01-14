import { MomentRange } from '@models/interfaces/MomentRange';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {
  selectedMomentRange: MomentRange;
  @Output() searchSubmit = new EventEmitter<MomentRange>();

  constructor() { }

  ngOnInit() {
  }

  onDateRangeChange() {
    this.emitSubmitSearch();
  }

  onSearchClick() {
    this.emitSubmitSearch();
  }

  private emitSubmitSearch() {
    this.searchSubmit.emit(this.selectedMomentRange);
  }
}
