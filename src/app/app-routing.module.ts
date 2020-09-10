import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'companies',
    loadChildren: () =>
      import('./pages/companies/companies.module').then(
        (m) => m.CompaniesModule
      ),
  },
  {
    path: 'company-detail',
    loadChildren: () =>
      import('./pages/company-detail/company-detail.module').then(
        (m) => m.CompanyDetailModule
      ),
  },
  {
    path: '**',
    redirectTo: 'companies',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
