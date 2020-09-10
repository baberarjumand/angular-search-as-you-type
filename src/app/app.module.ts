import { CompanyDetailService } from './shared/services/company-detail.service';
import { CompanyService } from './shared/services/company.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [CompanyService, CompanyDetailService],
  bootstrap: [AppComponent],
})
export class AppModule {}