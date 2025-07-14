// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token and set user
      this.setCurrentUser(this.decodeToken(token));
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.setCurrentUser(response.user);
          }
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, userData);
  }

  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  private decodeToken(token: string): User {
    // Implement JWT token decoding
    // This is a simplified version
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}