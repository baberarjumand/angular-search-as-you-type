import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyDetailRoutingModule } from './company-detail-routing.module';
import { CompanyDetailComponent } from './company-detail.component';


@NgModule({
  declarations: [CompanyDetailComponent],
  imports: [
    CommonModule,
    CompanyDetailRoutingModule
  ]
})
export class CompanyDetailModule { }
