// src/app/core/services/google-calendar.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

export interface CalendarEvent {
  id?: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  attendees?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  constructor(private api: ApiService) {}

  getAuthUrl(): Observable<{ url: string }> {
    return this.api.get<{ url: string }>('/auth/google');
  }

  createEvent(event: CalendarEvent): Observable<any> {
    return this.api.post('/calendar/events', event);
  }

  updateEvent(eventId: string, event: CalendarEvent): Observable<any> {
    return this.api.put(`/calendar/events/${eventId}`, event);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.api.delete(`/calendar/events/${eventId}`);
  }
}

