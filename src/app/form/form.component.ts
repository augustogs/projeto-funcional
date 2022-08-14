import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  user = {} as User;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  mudaRota() {
    localStorage.setItem('token', this.user.token);
    this.router.navigate([`branches/${this.user.id}/${this.user.repository}`])
  }

}
