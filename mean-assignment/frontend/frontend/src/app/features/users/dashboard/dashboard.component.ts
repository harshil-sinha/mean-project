import { Component, OnInit } from '@angular/core';

import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent
  implements OnInit
{
  users: any[] = [];
  stats: any;

  displayedColumns = [
    'name',
    'email',
    'role',
    'status',
  ];

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadStats();
  }

  loadUsers() {
    this.userService
      .getUsers()
      .subscribe((res: any) => {
        this.users = res;
      });
  }

  loadStats() {
    this.userService
      .getStats()
      .subscribe((res) => {
        this.stats = res;
      });
  }
}