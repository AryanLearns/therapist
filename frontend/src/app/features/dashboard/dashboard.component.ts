// src/app/features/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  todayAppointments$ = new Observable<any[]>();
  upcomingAppointments$ = new Observable<any[]>();
  recentSessions$ = new Observable<any[]>();

  constructor() {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Load dashboard data
  }
}