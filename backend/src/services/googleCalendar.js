// src/services/googleCalendar.js
const { google } = require('googleapis');

class GoogleCalendarService {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
  }

  // Get authorization URL
  getAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar']
    });
  }

  // Exchange code for tokens
  async getTokens(code) {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }

  // Set credentials
  setCredentials(tokens) {
    this.oauth2Client.setCredentials(tokens);
  }

  // Create calendar event
  async createEvent(eventDetails) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    
    const event = {
      summary: eventDetails.title,
      description: eventDetails.description,
      start: {
        dateTime: eventDetails.startTime,
        timeZone: 'America/New_York'
      },
      end: {
        dateTime: eventDetails.endTime,
        timeZone: 'America/New_York'
      },
      attendees: eventDetails.attendees || []
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event
    });

    return response.data;
  }

  // Update calendar event
  async updateEvent(eventId, eventDetails) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId: eventId,
      resource: eventDetails
    });

    return response.data;
  }

  // Delete calendar event
  async deleteEvent(eventId) {
    const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
    
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId
    });
  }
}

module.exports = GoogleCalendarService;
