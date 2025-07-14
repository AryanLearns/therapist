// src/controllers/calendarController.js
const GoogleCalendarService = require('../services/googleCalendar');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

class CalendarController {
  constructor() {
    this.googleCalendar = new GoogleCalendarService();
  }

  async createAppointmentWithCalendar(req, res) {
    try {
      const appointmentData = req.body;
      const userId = req.user.id;

      // Create appointment in database
      const appointment = new Appointment({
        ...appointmentData,
        therapistId: userId
      });

      await appointment.save();

      // Get user's Google Calendar credentials
      const user = await User.findById(userId);
      if (user.googleRefreshToken) {
        this.googleCalendar.setCredentials({
          refresh_token: user.googleRefreshToken
        });

        // Create Google Calendar event
        const calendarEvent = await this.googleCalendar.createEvent({
          title: `Appointment with ${appointmentData.patientName}`,
          description: appointmentData.notes || '',
          startTime: appointmentData.startTime,
          endTime: appointmentData.endTime,
          attendees: [appointmentData.patientEmail]
        });

        // Update appointment with Google Calendar event ID
        appointment.googleEventId = calendarEvent.id;
        await appointment.save();
      }

      res.json({ success: true, appointment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAppointmentWithCalendar(req, res) {
    try {
      const appointmentId = req.params.id;
      const updateData = req.body;
      const userId = req.user.id;

      // Update appointment in database
      const appointment = await Appointment.findOneAndUpdate(
        { _id: appointmentId, therapistId: userId },
        updateData,
        { new: true }
      );

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      // Update Google Calendar event if it exists
      if (appointment.googleEventId) {
        const user = await User.findById(userId);
        if (user.googleRefreshToken) {
          this.googleCalendar.setCredentials({
            refresh_token: user.googleRefreshToken
          });

          await this.googleCalendar.updateEvent(appointment.googleEventId, {
            title: updateData.title,
            description: updateData.notes || '',
            startTime: updateData.startTime,
            endTime: updateData.endTime
          });
        }
      }

      res.json({ success: true, appointment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAppointmentWithCalendar(req, res) {
    try {
      const appointmentId = req.params.id;
      const userId = req.user.id;

      const appointment = await Appointment.findOneAndDelete({
        _id: appointmentId,
        therapistId: userId
      });

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      // Delete Google Calendar event if it exists
      if (appointment.googleEventId) {
        const user = await User.findById(userId);
        if (user.googleRefreshToken) {
          this.googleCalendar.setCredentials({
            refresh_token: user.googleRefreshToken
          });

          await this.googleCalendar.deleteEvent(appointment.googleEventId);
        }
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CalendarController();