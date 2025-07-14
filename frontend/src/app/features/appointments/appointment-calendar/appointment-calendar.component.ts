// src/app/features/appointments/appointment-calendar/appointment-calendar.component.ts
import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from '../../../core/services/google-calendar.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent implements OnInit {
  events: CalendarEvent[] = [];
  selectedDate = new Date();

  constructor() {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  onDateSelect(date: Date): void {
    this.selectedDate = date;
    this.loadAppointments();
  }

  onEventClick(event: CalendarEvent): void {
    // Handle event click
  }

  private loadAppointments(): void {
    // Load appointments for selected date
  }
}