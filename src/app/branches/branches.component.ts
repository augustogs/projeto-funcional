import { Component, OnInit } from '@angular/core';
import { Branch } from '../interfaces/branch';
import { User } from '../interfaces/user';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { distinct, groupBy, nameToLowerCase, nameToUpperCase, orderBy, concatNameFirstCharAcc, concatNameFirstChar, fold, nameFiveFirstChar, compose, invertName } from '../utils/util';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  user = {} as User;
  branches: Branch[] = [];
  branchesBackup: Branch[] = [];

  acc: Branch = {name: "acc:",commit: {sha: "",url: ""},protected: true}

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

  getToUpperCase() {
    this.branches = [...this.branches].map(branch => nameToUpperCase(branch))
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

  concatFistCharName() {
    this.branches = [...this.branches].map(branch => concatNameFirstChar(branch))
  }

  getNameFiveFirstChar() {
    this.branches = [...this.branches].map(branch => nameFiveFirstChar(branch))
  }

  composeUpperNameFiveFirstChar() {
    const composeFunction = compose([nameToUpperCase,nameFiveFirstChar])
    this.branches = [...this.branches].map(branch => composeFunction(branch))
  }

  composeConcatFistCharInvertName() {
    const composeFunction = compose([concatNameFirstChar,invertName])
    this.branches = [...this.branches].map(branch => composeFunction(branch))
  }

  getDistinct() {
    this.branches = distinct([...this.branches])
  }

  resetBranches() {
    this.branches = [...this.branchesBackup]
  }

  foldConcatFistCharName() {
    this.branches = [fold(concatNameFirstCharAcc,this.acc,[...this.branches])]
  }


  invertBranchsName() {
    this.branches = [...this.branches].map(branch => invertName(branch))
  }

  invertBranchs() {
    this.branches = [...this.branches].reverse()
  }

  getForm() {
    this.router.navigate(['']);
  }

}
