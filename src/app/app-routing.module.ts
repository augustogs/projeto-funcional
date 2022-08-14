import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches/branches.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'branches/:id/:repository',
    component: BranchesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
