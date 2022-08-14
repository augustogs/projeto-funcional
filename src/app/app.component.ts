import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import { Branch } from './interfaces/branch';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto-funcional';

  branch = {} as Branch;
  user = {} as User;
  branches: Branch[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
  }

  getBranches() {    
    this.apiService.getBranchesByIdERepositorio(this.user).subscribe((branches: Branch[]) => {
      this.branches = branches;
      console.log(this.branches);
    });
  }

  onSubmitTemplateBased(value: any) {
    console.log(value);
  }
}
