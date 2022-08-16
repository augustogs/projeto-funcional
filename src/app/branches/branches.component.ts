import { Component, OnInit } from '@angular/core';
import { Branch } from '../interfaces/branch';
import { User } from '../interfaces/user';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { distinct, groupBy, nameToLowerCase, orderBy } from '../utils/util';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  user = {} as User;
  branch = {} as Branch;
  branches: Branch[] = [];
  branchesBackup: Branch[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {
    const id: string = route.snapshot.params['id'];
    const repository: string = route.snapshot.params['repository'];   

    const token = localStorage.getItem('token');
    localStorage.removeItem('token');
    if (token != null) {
      this.user = {id, repository, token};
    } else {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.getBranches();
  }

  getBranches() {    
    this.apiService.getBranchesByIdERepositorio(this.user).subscribe((branches: Branch[]) => {
      this.branches = branches;
      this.branchesBackup = [...this.branches];
    });
  }

  getToLowerCase() {
    this.branches = [...this.branches].map(branch => nameToLowerCase(branch))
  }

  getBranchesOrderedByName() {
    this.branches = orderBy('name', [...this.branches]);
  }

  getDuplicateBranches() {
    this.branches = this.branches.concat([...this.branches])
  }

  getProtectedBranches() {
    this.branches = groupBy('protected', [...this.branches])['true']
  }

  getUnprotectedBranches() {
    this.branches = groupBy('protected', [...this.branches])['false']
  }

  getDistinct() {
    this.branches = distinct([...this.branches])
  }

  resetBranches() {
    this.branches = [...this.branchesBackup]
  }

  getForm() {
    this.router.navigate(['']);
  }

}
