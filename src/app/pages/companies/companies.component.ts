import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss'],
})
export class CompaniesComponent implements OnInit {
  searchString: string;

  constructor() {}

  ngOnInit(): void {
    this.searchString = '';
  }

  onSearchbarClick(): void {}
}
