import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  COMPANIES_URL = 'https://5f59cabb8040620016ab960d.mockapi.io/';

  constructor(private http: HttpClient) {}

  getAllCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.COMPANIES_URL + 'companies');
  }

  private getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

  getTenCompanies(): Observable<Company[]> {
    const randomInt = this.getRandomIntInclusive(1, 5);
    return this.http.get<Company[]>(
      this.COMPANIES_URL + 'companies' + '?page=' + randomInt + '&limit=10'
    );
  }
}
