// src/app/features/appointments/appointment-form/appointment-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleCalendarService } from '../../../core/services/google-calendar.service';
import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {
  @Input() appointment: any = null;
  appointmentForm: FormGroup;
  loading = false;
  googleCalendarConnected = false;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private googleCalendarService: GoogleCalendarService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.checkGoogleCalendarConnection();
  }

  private initializeForm(): void {
    this.appointmentForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      title: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      type: ['follow-up', Validators.required],
      location: [''],
      notes: [''],
      syncWithGoogleCalendar: [true]
    });

    if (this.appointment) {
      this.appointmentForm.patchValue(this.appointment);
    }
  }

  private checkGoogleCalendarConnection(): void {
    // Check if user has connected Google Calendar
    // This would typically be stored in user profile
    this.googleCalendarConnected = true; // Placeholder
  }

  onSubmit(): void {
    if (this.appointmentForm.invalid) return;

    this.loading = true;
    const formData = this.appointmentForm.value;

    const saveOperation = this.appointment
      ? this.appointmentService.updateAppointment(this.appointment.id, formData)
      : this.appointmentService.createAppointment(formData);

    saveOperation.subscribe({
      next: (response) => {
        // Handle success
        this.loading = false;
      },
      error: (error) => {
        console.error('Error saving appointment:', error);
        this.loading = false;
      }
    });
  }

  connectGoogleCalendar(): void {
    this.googleCalendarService.getAuthUrl().subscribe({
      next: (response) => {
        window.location.href = response.url;
      },
      error: (error) => {
        console.error('Error getting Google auth URL:', error);
      }
    });
  }
}

