import { CompanyService } from './../../shared/services/company.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/shared/model/company';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit, OnDestroy {
  companyId: string;
  companySub: Subscription;
  company: Company;

  constructor(
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.companyId = this.route.snapshot.paramMap.get('id');
    // console.log(this.companyId);
    this.companySub = this.companyService
      .getCompanyById(this.companyId)
      .subscribe((result) => {
        this.company = result;
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    if (this.companySub) {
      this.companySub.unsubscribe();
    }
    this.resetSearchResultSetOnHomepage();
  }

  resetSearchResultSetOnHomepage(): void {
    this.companyService.getFirstTenCompanies();
  }
}
