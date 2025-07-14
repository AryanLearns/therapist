// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'patients', 
    loadChildren: () => import('./features/patients/patients.module').then(m => m.PatientsModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'appointments', 
    loadChildren: () => import('./features/appointments/appointments.module').then(m => m.AppointmentsModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'sessions', 
    loadChildren: () => import('./features/sessions/sessions.module').then(m => m.SessionsModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }