import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MailsTableComponent } from './components/mails/mails-table/mails-table.component';
import { SortableThDirective } from '@directives/sortable-th.directive';
import { UpdateBadgeDirective } from '@directives/update-badge.directive';
import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    SearchPanelComponent,
    MailsTableComponent,
    DateTimeFormatPipe,
    SortableThDirective,
    UpdateBadgeDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [
    DateTimeFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
