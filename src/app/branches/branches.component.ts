import { Component, OnInit } from '@angular/core';
import { Branch } from '../interfaces/branch';
import { User } from '../interfaces/user';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

import { groupBy, orderBy } from '../utils/util';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  user = {} as User;
  branch = {} as Branch;
  branches: Branch[] = [];

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
    this.getBranchesOrderedByName();
  }

  getBranchesOrderedByName() {    
    this.apiService.getBranchesByIdERepositorio(this.user).subscribe((branches: Branch[]) => {
      const key = this.branches[0]
      this.branches = orderBy(key, branches);
    });
  }

  getForm() {
    this.router.navigate(['']);
  }

}
