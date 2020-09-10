import { CompanyService } from './../../shared/services/company.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/model/company';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  // searchString: string;
  searchForm: FormGroup;
  searchResults: Company[];
  searchResultsSub: Subscription;

  // searchResultSet = new BehaviorSubject<Company[]>(null);

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.searchResultsSub = this.companyService
      .getTenCompanies()
      .subscribe((companies) => {
        this.searchResults = companies;
        // console.log(this.searchResults);
      });
  }

  ngOnDestroy(): void {
    if (this.searchResultsSub) {
      this.searchResultsSub.unsubscribe();
    }
  }

  onSearchbarClick(): void {}
}
