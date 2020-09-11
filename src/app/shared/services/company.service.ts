import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Company } from '../model/company';
import { switchMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  COMPANIES_URL = 'https://5f59cabb8040620016ab960d.mockapi.io/';
  currentResultSet = new BehaviorSubject<Company[]>(null);

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {
    this.getFirstTenCompanies();
  }

  // The maximum is inclusive and the minimum is inclusive
  private getRandomIntInclusive(min, max): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.COMPANIES_URL + 'companies');
  }

  getCurrentResultSet(): Observable<Company[]> {
    return this.currentResultSet.asObservable();
  }

  getFirstTenCompanies(): void {
    // const randomInt = this.getRandomIntInclusive(1, 5);
    // return this.http.get<Company[]>(
    //   this.COMPANIES_URL + 'companies' + '?page=' + randomInt + '&limit=10'
    // );
    this.spinner.show();
    this.http
      .get<Company[]>(
        this.COMPANIES_URL + 'companies' + '?page=' + 1 + '&limit=10'
      )
      .subscribe((resultArr) => {
        this.currentResultSet.next(resultArr);
        this.spinner.hide();
      });
  }

  getCompaniesByPageNumber(pageNumber): void {
    this.spinner.show();
    this.http
      .get<Company[]>(
        this.COMPANIES_URL + 'companies' + '?page=' + pageNumber + '&limit=10'
      )
      .subscribe((resultArr) => {
        this.currentResultSet.next(
          this.currentResultSet.value.concat(resultArr)
        );
        this.spinner.hide();
      });
  }

  getCompanyById(companyId): Observable<Company> {
    return this.http.get<Company>(
      this.COMPANIES_URL + 'companies/' + companyId
    );
  }

  searchCompaniesByTerm(searchString): void {
    this.spinner.show();
    this.http
      .get<Company[]>(
        this.COMPANIES_URL + 'companies' + '?search=' + searchString
      )
      .subscribe((resultArr) => {
        this.currentResultSet.next(resultArr);
        this.spinner.hide();
      });
  }
}
