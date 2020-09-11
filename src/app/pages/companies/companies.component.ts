import { CompanyService } from './../../shared/services/company.service';
import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Company } from 'src/app/shared/model/company';
import { Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
  searchBar: FormControl = new FormControl();
  searchBarInputSub: Subscription;

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

    this.searchBarInputSub = this.searchBar.valueChanges
      .pipe(debounceTime(750), distinctUntilChanged())
      .subscribe((searchTerm) => {
        // console.log(searchTerm);
        if (searchTerm.length >= 3) {
          this.companyService.searchCompaniesByTerm(searchTerm);
          this.allResultsFetched = true;
        } else if (!searchTerm || searchTerm.length === 0) {
          this.currentPage = 1;
          this.companyService.getFirstTenCompanies();
          this.allResultsFetched = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.searchResultsSub) {
      this.searchResultsSub.unsubscribe();
    }

    if (this.searchBarInputSub) {
      this.searchBarInputSub.unsubscribe();
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

  clearSearchBarText(): void {
    this.searchBar.patchValue('');
  }
}
