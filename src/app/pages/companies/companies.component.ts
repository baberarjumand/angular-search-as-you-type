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
  currentPage = 1;
  allResultsFetched = false;

  // searchResultSet = new BehaviorSubject<Company[]>(null);

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    // this.searchResultsSub = this.companyService
    //   .getFirstTenCompanies()
    //   .subscribe((companies) => {
    //     this.searchResults = companies;
    //     // console.log(this.searchResults);
    //   });
    this.searchResultsSub = this.companyService.currentResultSet.subscribe(
      (resultArr) => {
        this.searchResults = resultArr;
      }
    );
    // this.companyService.getFirstTenCompanies();
  }

  ngOnDestroy(): void {
    if (this.searchResultsSub) {
      this.searchResultsSub.unsubscribe();
    }
  }

  loadTenMoreResults(): void {
    if (this.currentPage < 5) {
      this.currentPage++;
      if (this.currentPage >= 5) {
        this.allResultsFetched = true;
      }
      this.companyService.getCompaniesByPageNumber(this.currentPage);
    }
  }

  onSearchbarClick(): void {}
}
