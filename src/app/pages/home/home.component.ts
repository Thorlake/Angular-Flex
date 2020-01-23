import { MomentRange } from '@models/moment-range';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dateRange: MomentRange;

  constructor() { }

  ngOnInit() {
  }

  onSearchSubmit(dateRange: MomentRange) {
    this.dateRange = dateRange;
  }
}
